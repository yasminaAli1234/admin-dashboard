import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Show_add_category from "../../components/Category_screen/Show_add_category";
import { useGet } from "../../Hooks/useGet";
import { usePost } from "../../Hooks/usePostJson";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
const Update_category = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [name,setName] = useState("")
  const [image, setImage] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState(null);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [categoryId,setCategoryId] = useState('')
   const {refetch: refetchSubCategory,loading: loadingSubCategory,data: subCategory,} = useGet({url: `https://marfaa-alex.com/api/admin/subCategories`,});
  const { state } = useLocation(); // Get state passed via navigate
  const { category } = state || {}; 
  const auth = useAuth()
  const { postData, loadingPost, response } = usePost({
    url: `https://marfaa-alex.com/api/admin/add/subcategory`,
  });

useEffect(() => {
if(category){
  setValue(category.name)
  setImage(category.image)
  setCategoryId(category.id)
}
}, [category])

useEffect(() => {
  refetchSubCategory()
}, [refetchSubCategory])


useEffect(() => {
  if(subCategory){
    setSubCategories(subCategory.subCategories)
  }
  console.log('data' , subCategory)
}, [subCategory])

  

  // Load saved subcategories from localStorage on component mount
  // useEffect(() => {
  //   const savedSubCategories = JSON.parse(localStorage.getItem("subCategoriesy") || "[]");
  //   setSubCategories(savedSubCategories);
  // }, []);

  // Save subcategories to localStorage whenever they change
  // useEffect(() => {
  //   localStorage.setItem("subCategoriesy", JSON.stringify(subCategories));
  // }, [subCategories]);

  const handleGoBack = () => navigate(-1);

  // Add or Update SubCategory
  const handleAddOrUpdateSubCategory = async () => {
    if (!categoryId || !name || !image) {
      auth.toastError("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("category_id", categoryId);
    formData.append("name", name);
    formData.append("image", image);

    try {
      if (editingSubCategory !== null) {
        // Update SubCategory
        await axios.put(
          `https://marfaa-alex.com/api/admin/subCategory/update/${editingSubCategory.id}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } ,
        "Authorization": `Bearer ${auth.user?.token || ""}`,
        }
        );
        auth.toastSuccess("Subcategory updated successfully!");
      } else {
        // Add New SubCategory
    postData(formData,"data added succssful")
      }
      refetchSubCategory();
      setEditingSubCategory(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving subcategory:", error);
      auth.toastError("Failed to save subcategory");
    }
  };

  const handleEditSubCategory = (index) => {
    setEditingSubCategory(index);
    setShowPopup(true);
  };

  const confirmRemoveSubCategory = (index) => {
    setSubcategoryToDelete(index);
    setDeletePopupVisible(true);
  };

  const handleRemoveSubCategory = () => {
    if (subcategoryToDelete !== null) {
      const updatedSubCategories = subCategories.filter((_, i) => i !== subcategoryToDelete);
      setSubCategories(updatedSubCategories);
      setSubcategoryToDelete(null);
    }
    setDeletePopupVisible(false);
  };

  const handleCancelDelete = () => {
    setSubcategoryToDelete(null);
    setDeletePopupVisible(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Store only one image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-4 py-6 bg-white h-screen">
      <div className="mb-4">
        <i
          onClick={handleGoBack}
          className="fa-solid fa-arrow-left text-black text-4xl mb-10 cursor-pointer"
        ></i>
        <h2 className="text-3xl font-bold text-black">Edit Category:</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="categoryName" className="block text-black font-semibold mb-2 text-xl">
            Name:
          </label>
          <input
            type="text"
            id="categoryName"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full p-2 border rounded-md bg-gray-100 outline-none caret-black text-black text-1xl"
            placeholder="Enter category name"
          />
            <div>
          <label htmlFor="categoryPhoto" className="block text-black font-semibold mb-2 text-xl">
            Background Photo:
          </label>
          <div className="w-[80%] h-[140px] flex justify-center items-center bg-gray-100 relative">
            <img src={image} alt="Category" className="h-full w-full object-center" />
            <div className="absolute inset-0 bg-black opacity-50 "></div>
            <label
              htmlFor="fileInput"
              className="absolute text-white bg-green px-7 py-2 rounded-3xl hover:bg-main focus:outline-none border-none cursor-pointer"
            >
              Change Image
            </label>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={(e)=>handleImageUpload(e)}
              accept="image/*"
            />
          </div>
        </div>
          <div className="flex justify-between items-center mt-20">
            <h2 className="text-2xl font-bold text-black">Sub Category</h2>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-main text-white px-8 py-2 rounded-md flex items-center justify-center border-none"
            >
              <i className="fa-solid fa-plus mr-2"></i>
            </button>
          </div>
        </div>
      
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-black">Added SubCategories:</h2>
        {subCategories.length > 0 ? (
          subCategories.map((subCategory, index) => (
            <div key={index} className="flex items-center gap-7 mt-3">
              <div className="flex justify-between bg-gray2 items-center w-[90%] p-2">
                <img src={subCategory.image} alt="Subcategory" className="h-12 w-12 object-cover rounded-md" />
                <p className="ml-4 text-black">{subCategory.name}</p>
              </div>
              <i
                className="fa-solid fa-edit text-gray-900 text-xl cursor-pointer"
                onClick={() => handleEditSubCategory(index)}
              ></i>
              <i
                className="fa-solid fa-trash text-red-500 text-xl cursor-pointer"
                onClick={() => confirmRemoveSubCategory(index)}
              ></i>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No subcategories added yet</p>
        )}
      </div>
      {showPopup && (
      <Show_add_category
      value={editingSubCategory !== null ? subCategories[editingSubCategory].name : ""}
      onClose={() => setShowPopup(false)}
      onAddCategory={handleAddOrUpdateSubCategory}
      previousImage={editingSubCategory !== null ? subCategories[editingSubCategory].image : ""}
    />
      )}
      {deletePopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md text-center">
            <p className="text-lg text-black mb-4">
              Are you sure you want to delete this Subcategory?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleRemoveSubCategory}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Yes, Remove It
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Update_category;
