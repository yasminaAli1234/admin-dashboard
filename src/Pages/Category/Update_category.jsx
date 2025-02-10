import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGet } from "../../Hooks/useGet";
import { usePost } from "../../Hooks/usePostJson";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { useDelete } from "../../Hooks/useDelete";

const Update_category = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [subCategories, setSubCategories] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);

  const { refetch: refetchSubCategory, data: subCategory } = useGet({
    url: `https://marfaa-alex.com/api/admin/subCategories`,
  });

  const { state } = useLocation();
  const { category } = state || {};
  const auth = useAuth();
  const { postData } = usePost({ url: `https://marfaa-alex.com/api/admin/add/subCategory` });
  const { deleteData } = useDelete();
  useEffect(() => {
    if (category) {
      setValue(category.name);
      setImage(category.image);
      setCategoryId(category.id);
    }
  }, [category]);

  useEffect(() => {
    refetchSubCategory();
  }, [refetchSubCategory]);

  useEffect(() => {
    if (subCategory) {
      setSubCategories(subCategory.subCategories);
    }
  }, [subCategory]);

  const handleGoBack = () => navigate(-1);

  // Handle Add New SubCategory
  const handleAddSubCategory = async () => {
    if (!categoryId) {
      auth.toastError("Error: Category ID missing.");
      return;
    }
    if (!name.trim()) {
      auth.toastError("Enter name");
      return;
    }
    if (!image) {
      auth.toastError("Enter image");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("image", image);

    try {
      await postData(formData, "Subcategory added successfully");
      refetchSubCategory();
      setShowAddPopup(false);
      setName("");
      setImage(null);
    } catch (error) {
      console.error("Error adding subcategory:", error);
      auth.toastError("Failed to add subcategory");
    }
  };
  const handleUpdateSubCategory = async () => {
    if (!editingSubCategory || !name || !image) {
      auth.toastError("Please fill in all fields.");
      return;
    }
  
    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("image", image);
  
    try {
      const response = await axios.put(
        `https://marfaa-alex.com/api/admin/subCategory/update/${editingSubCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
        }
      );
  
      console.log("API Response:", response.data); // Debugging
      if (response.data.success) {
        auth.toastSuccess("Subcategory updated successfully!");
        refetchSubCategory(); // Refresh the data
        setShowUpdatePopup(false);
        setEditingSubCategory(null);
      } else {
        auth.toastError(response.data.message || "Update failed!");
      }
    } catch (error) {
      console.error("Error updating subcategory:", error);
      auth.toastError("Failed to update subcategory");
    }
  };
  

  const handleEditSubCategory = (subcategory) => {
    setEditingSubCategory(subcategory);
    setName(subcategory.name);
    setImage(subcategory.image);
    setShowUpdatePopup(true);
  };

  // Delete Customer
  const handleDelete = async (id, name) => {
    const success = await deleteData(`https://marfaa-alex.com/api/admin/subCategory/delete/${id}`, `${name} Deleted Success.`);

    if (success) {
        setSubCategories(
        subCategories.filter((cat) =>
          cat.id !== id
        )
      );
    }
  };



  

  return (
    <div className="px-4 py-6 bg-white min-h-screen">
      <div className="mb-4">
        <i onClick={handleGoBack} className="fa-solid fa-arrow-left text-black text-4xl mb-10 cursor-pointer"></i>
        <h2 className="text-3xl font-bold text-black">Edit Category:</h2>
      </div>

      {/* Category Name & Image */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <label className="block text-black font-semibold mb-2 text-xl">Name:</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-100 outline-none caret-black text-black text-xl"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label className="block text-black font-semibold mb-2 text-xl">Background Photo:</label>
          <div className="w-full h-[150px] flex justify-center items-center bg-gray-100 relative rounded-md overflow-hidden">
            {image && <img src={image? image : image} alt="Category" className="h-full w-full object-cover" />}
            <label htmlFor="fileInput" className="absolute text-white bg-green px-6 py-2 rounded-lg cursor-pointer">
              Change Image
            </label>
            <input type="file" id="fileInput" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
          </div>
        </div>
      </div>

      {/* Subcategories List */}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-black">Sub Category</h2>
          <button onClick={() => setShowAddPopup(true)} className="bg-main text-white px-6 py-2 rounded-md">
            <i className="fa-solid fa-plus mr-2"></i> Add
          </button>
        </div>

        <div className="mt-6 space-y-4">
          {subCategories.length > 0 ? (
            subCategories.map((subcategory) => (
              <div key={subcategory.id} className="flex items-center gap-4 bg-gray-100 p-3 rounded-md">
                <img src={subcategory.image} alt="Subcategory" className="h-12 w-12 object-cover rounded-md" />
                <p className="text-black flex-1">{subcategory.name}</p>
                <i className="fa-solid fa-edit text-gray-900 text-xl cursor-pointer" onClick={() => handleEditSubCategory(subcategory)}></i>
                <i className="fa-solid fa-trash text-red-500 text-xl cursor-pointer" onClick={()=>handleDelete(subcategory.id,subcategory.name)}></i>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subcategories added yet</p>
          )}
        </div>
      </div>

      {/* Add Subcategory Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Subcategory</h2>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              placeholder="Enter subcategory name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="block font-semibold">Image:</label>
            <input type="file" className="w-full p-2 border rounded-md mb-4" onChange={(e) => setImage(e.target.files[0])} />

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowAddPopup(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleAddSubCategory} className="bg-main text-white px-4 py-2 rounded-md">
                Add
              </button>
            </div>
          </div>
        </div>
      )}

           {/* Update Subcategory Popup */}
           {showUpdatePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Subcategory</h2>
            <label className="block font-semibold">Name:</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="block font-semibold">Image:</label>
            <input type="file" className="w-full p-2 border rounded-md mb-4" onChange={(e) => setImage(e.target.files[0])} />

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowUpdatePopup(false)} className="bg-gray-500 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
              <button onClick={handleUpdateSubCategory} className="bg-main text-white px-4 py-2 rounded-md">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update_category;
