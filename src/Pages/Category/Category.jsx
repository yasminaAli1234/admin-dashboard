import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePost } from '../../Hooks/usePostJson';
import { useAuth } from '../../Context/Auth';
import { useGet } from '../../Hooks/useGet';
import { useDelete } from '../../Hooks/useDelete';
import Loading from '../../components/Loading';

const Category = () => {
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false); // State to toggle view
  const [currentCategoryId, setCurrentCategoryId] = useState(null); // State to hold selected category ID
  const { state } = useLocation; 
  const [items, setItems] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const {refetch: refetchCategory,loading: loadingCategory,data: category,} = useGet({url: `https://marfaa-alex.com/api/admin/categories`,});
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const { deleteData, loadingDelete, responseDelete } = useDelete();
  const [categories, setCategories] = useState([]);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  

  const auth= useAuth()
  const { postData, loadingPost, response } = usePost({
    url: `https://marfaa-alex.com/api/admin/add/category`,
  });

  useEffect(() => {
    refetchCategory()
  }, [refetchCategory])

  useEffect(() => {
    if(category){
      setCategories(category.categories)
    }
    console.log("data category" , category)
  }, [category])

  // useEffect(() => {
  //   const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];
  //   setCategories(storedCategories);
  // }, []);

 

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
  
  const handleUpdateCategoryClick = (category) => {
    setEditingCategory(category);
    setUpdatedName(category.name);
    setUpdatedImage(category.image);
    setShowUpdateModal(true);
  };
  
  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

    // Function to handle form submission and add category
    const handleSubmit = () => {
    if(!categoryName){
      auth.toastError("please enter name")
    }
    if(!image){
      auth.toastError("please enter image")
    }
    const formData= new FormData();
    formData.append("name",categoryName)
    formData.append("image",image)
    postData(formData,'data added successful').then(()=>setShowModal(false)).then(()=>refetchCategory())
    setCategoryName('')
    setImage('')
    };


    const handleUpdateCategory = async () => {
      if (!editingCategory) return;
    
      try {
        const formData = new FormData();
        formData.append("name", updatedName);
        if (updatedImage) formData.append("image", updatedImage); // Only if new image is provided

        
        const response = await fetch(
          `https://marfaa-alex.com/api/admin/category/update/${editingCategory.id}`,
          {
            method: "PUT", // Try "POST" if PUT doesn't work
            headers: {
              Authorization: `Bearer ${auth.user?.token || ""}`,
            },
            body: formData,
          }
        );
    
        const result = await response.json();
        if (response.ok) {
          auth.toastSuccess("Category updated successfully!");
          setShowUpdateModal(false);
          refetchCategory();
        } else {
          console.error("Server Error:", result);
          auth.toastError(result.message || "Failed to update category");
        }
      } catch (error) {
        console.error("Error updating category:", error);
        auth.toastError("Something went wrong. Please try again.");
      }
    };
    

     // Delete Customer
     const handleDelete = async (id, name) => {
      const success = await deleteData(`https://marfaa-alex.com/api/admin/category/delete/${id}`, `${name} Deleted Success.`);
  
      if (success) {
          setCategories(
          categories.filter((cat) =>
            cat.id !== id
          )
        );
      }
    };
  // Confirm deletion and remove item from localStorage
  const handleConfirmDelete = () => {
    // Filter out the item to delete
    const updatedItems = categories.filter(item => item.name !== itemToDelete.name);
    
    // Update state with the new item list
    setCategories(updatedItems);
    
    // Save the updated list to localStorage
    localStorage.setItem("categories", JSON.stringify(updatedItems));
    
    // Close the delete popup
    setShowDeletePopup(false); 
  };

  // Cancel the deletion
  const handleCancelDelete = () => {
    setShowDeletePopup(false);  // Close the popup
  };
  // Handle click for navigating to Add Category page
  // const handleAddCategoryClick = () => {
  //   navigate('/category/add',{
  //     state:{items}
  //   });
  // };
   // Handle click for navigating to Add Category page


   const handleCategoryClick = (category) => {
    // Navigate to the update page and pass the item data as state
    navigate(`/category/update/${category.id}`, {
      state: { category },
    });
  };

if(loadingCategory){
  return <Loading/>
}

  // Handle click for toggling to Update Category view
  // const handleUpdateCategoryClick = (id) => {
  //   setCurrentCategoryId(id); // Set the category ID to update
  //   setIsUpdating(true); // Switch to update view
  // };

  // Handle returning to the Category view
  // const handleBackToCategory = () => {
  //   setIsUpdating(false); // Switch back to category list view
  //   setCurrentCategoryId(null); // Clear the category ID
  // };

  return (
    <div className="bg-white ">
      
      <div className="px-6 py-8 min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-2 justify-between  items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green hover:bg-main text-white px-6 py-3 rounded-lg flex items-center justify-center transition duration-300"
        >
          <i className="fa-solid fa-plus mr-2"></i> Add Category
        </button>
      </div>

      {/* Category List */}
      {categories.length === 0 ? (
        <h2 className="text-center text-xl text-gray-600">
          No categories exist yet.
        </h2>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              <div
                className="h-48 bg-cover bg-center rounded-xl flex flex-col justify-between items-center p-4"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
                
                <h2 className="relative text-white font-semibold text-lg text-center z-10">
                  {category.name}
                </h2>

                {/* Action Icons */}
                <div className="relative z-10 flex gap-4">
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateCategoryClick(category);
                    }}
                    className="fa-solid fa-edit text-white text-xl cursor-pointer hover:text-blue-400"
                  ></i>
                  <i
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(category.id, category.name);
                    }}
                    className="fa-solid fa-trash text-white text-xl cursor-pointer hover:text-red-500"
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

             {/* Add Category Modal */}
      {showModal && (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
    <h3 className="text-main text-xl font-semibold mb-6 text-center">إضافة فئة جديدة</h3>
    
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">اسم الفئة</label>
      <input
        type="text"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        className="w-full text-white p-3 border-2 border-gray-300 bg-main rounded-md focus:outline-none focus:ring-2 focus:ring-main transition duration-200"
        placeholder="أدخل اسم الفئة"
      />
    </div>

    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">صورة الفئة</label>
      <input
        type="file"
        onChange={(e) => handleImageUpload(e)}
        className="w-full p-3 bg-main border-2 border-gray-300 rounded-md mb-2 cursor-pointer"
      />
      {image && (
        <div className="mt-4">
          <img src={image} alt="Category" className="w-full h-20 object-cover rounded-md" />
        </div>
      )}
    </div>

    <div className="flex justify-between items-center">
      <button
        onClick={() => setShowModal(false)}
        className="px-6 py-3 bg-gray-300 text-black rounded-md text-sm font-medium hover:bg-gray-400 transition duration-200"
      >
        Cancle
      </button>
      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-main text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
      >
        Add
      </button>
    </div>
  </div>
</div>
      )}

        {showDeletePopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h3 className="text-main font-semibold mb-4">هل أنت متأكد أنك تريد حذف هذه الفئة؟</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelDelete}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      )}

      {/* show update  */}

      {showUpdateModal && (
  <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <h3 className="text-main text-xl font-semibold mb-6 text-center">Update Category</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Category Image</label>
        <input
          type="file"
          onChange={handleImageUpdate}
          className="w-full p-3 border-2 border-gray-300 rounded-md cursor-pointer"
        />
        {updatedImage && (
          <div className="mt-4">
            <img src={updatedImage} alt="Updated" className="w-full h-20 object-cover rounded-md" />
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button onClick={() => setShowUpdateModal(false)} className="bg-gray-300 text-black px-4 py-2 rounded-md">
          Cancel
        </button>
        <button onClick={handleUpdateCategory} className="bg-main text-white px-4 py-2 rounded-md">
          Update
        </button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Category;
