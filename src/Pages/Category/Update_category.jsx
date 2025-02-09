import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Show_add_category from "../../components/Category_screen/Show_add_category";
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
  const [image, setImage] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const { refetch: refetchSubCategory, loading: loadingSubCategory, data: subCategory } = useGet({
    url: `https://marfaa-alex.com/api/admin/subCategories`,
  });

  const { state } = useLocation();
  const { category } = state || {};
  const auth = useAuth();

  const { postData, loadingPost, response } = usePost({
    url: `https://marfaa-alex.com/api/admin/add/subcategory`,
  });
   const { deleteData, loadingDelete, responseDelete } = useDelete();

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
    if (!categoryId || !name || !image) {
      auth.toastError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("image", image);

    try {
      postData(formData, "Subcategory added successfully");
      refetchSubCategory();
      setShowAddPopup(false);
    } catch (error) {
      console.error("Error adding subcategory:", error);
      auth.toastError("Failed to add subcategory");
    }
  };

  // Handle Update SubCategory
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
      await axios.put(
        `https://marfaa-alex.com/api/admin/subCategory/update/${editingSubCategory.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
        }
      );
      auth.toastSuccess("Subcategory updated successfully!");
      refetchSubCategory();
      setShowUpdatePopup(false);
      setEditingSubCategory(null);
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

  const confirmRemoveSubCategory = (subcategory) => {
    setSubcategoryToDelete(subcategory);
    setDeletePopupVisible(true);
  };

  const handleRemoveSubCategory = async () => {
    if (!subcategoryToDelete) return;
  
    const success = await deleteData(
      `https://marfaa-alex.com/api/admin/subCategory/delete/${subcategoryToDelete.id}`,
      `${subcategoryToDelete.name} deleted.`
    );
  
    if (success) {
      setSubCategories((prev) => prev.filter((sub) => sub.id !== subcategoryToDelete.id));
      refetchSubCategory();
    }
  
    setDeletePopupVisible(false);
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
          <label htmlFor="categoryName" className="block text-black font-semibold mb-2 text-xl">
            Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-3 border rounded-md bg-gray-100 outline-none caret-black text-black text-xl"
            placeholder="Enter category name"
          />
        </div>

        <div>
          <label htmlFor="categoryPhoto" className="block text-black font-semibold mb-2 text-xl">
            Background Photo:
          </label>
          <div className="w-full h-[150px] flex justify-center items-center bg-gray-100 relative rounded-md overflow-hidden">
            <img src={image} alt="Category" className="h-full w-full object-cover" />
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
                <i className="fa-solid fa-trash text-red-500 text-xl cursor-pointer" onClick={handleRemoveSubCategory}></i>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No subcategories added yet</p>
          )}
        </div>
      </div>

      {/* Add Popup */}
      {showAddPopup && <Show_add_category onClose={() => setShowAddPopup(false)} onAddCategory={handleAddSubCategory} />}

      {/* Update Popup */}
      {showUpdatePopup && <Show_add_category onClose={() => setShowUpdatePopup(false)} onAddCategory={handleUpdateSubCategory} value={name} previousImage={image} />}
    </div>
  );
};

export default Update_category;
