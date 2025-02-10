import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../Hooks/useGet';
import ProductView from '../../Pages/Product/ProductView';
import Loading from '../Loading';

const Table = () => {
  const { refetch: refetchProduct, loading: loadingProduct, data: dataProduct } = useGet({ url: 'https://marfaa-alex.com/api/admin/products'});
  const [Product,setProduct] = useState([])
  useEffect(() => {
    refetchProduct()
  }, [refetchProduct])

  useEffect(() => {
    if(dataProduct){
      setProduct(dataProduct.prodcusts)
    }
    console.log("data product" , dataProduct)
  }, [dataProduct])


  const initialData = [
    {
      product_id: 1,
      product_image: 'https://via.placeholder.com/50',
      product_name: 'Product A',
      seller: 'Seller A',
      type: 'Electronics',
      amount: 150,
      date_submitted: '2024-12-18T08:30:00Z',
      status: 'under_check',
      action: 'View',
    },
    {
      product_id: 2,
      product_image: 'https://via.placeholder.com/50',
      product_name: 'Product B',
      seller: 'Seller B',
      type: 'Furniture',
      amount: 200,
      date_submitted: '2024-12-19T10:00:00Z',
      status: 'under_check',
      action: 'View',
    },
    {
      product_id: 3,
      product_image: 'https://via.placeholder.com/50',
      product_name: 'Product C',
      seller: 'Seller C',
      type: 'Appliances',
      amount: 300,
      date_submitted: '2024-12-20T12:00:00Z',
      status: 'approved',
      action: 'View',
    },
    {
      product_id: 4,
      product_image: 'https://via.placeholder.com/50',
      product_name: 'Product D',
      seller: 'Seller D',
      type: 'Clothing',
      amount: 100,
      date_submitted: '2024-12-21T14:00:00Z',
      status: 'rejected',
      action: 'View',
    },
  ];

  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]); // To store original data
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch items from localStorage when the component mounts
    const storedItems = JSON.parse(localStorage.getItem('categoryItems')) || initialData;
    setOriginalData(storedItems); // Save the original data
    setData(storedItems); // Set initial data
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setData(originalData); // Reset to original data when search is cleared
    } else {
      setData(
        originalData.filter(
          (item) =>
            item.productTitle.toLowerCase().includes(term) ||
            item.productPrice.toLowerCase().includes(term) ||
            item.type.toLowerCase().includes(term) ||
            item.status.toLowerCase().includes(term)
        )
      );
    }
  };

  const handleAddCategoryClick = () => {
    // Get categories from localStorage
    const storedCategories = JSON.parse(localStorage.getItem('categories') || '[]');
    
    // Navigate to the add category page with the categories from localStorage
    navigate('/product/add', {
      state: { items: storedCategories },
    });
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(id)
        ? prevSelectedItems.filter((item) => item !== id)
        : [...prevSelectedItems, id]
    );
  };


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.map((item, index) => index));
    } else {
      setSelectedItems([]);
    }
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleViewAction = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  if(loadingProduct){
    return(<>{<Loading/>}</>)
  }
  return (
    <div className="p-4">
      {/* Search Input */}
      <div className="flex gap-3 justify-between">
      <div className="flex flex-1 items-center mb-4 bg-gray2 border-none text-black rounded-3xl p-1 shadow-sm">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search"
        className="w-full p-2  bg-transparent border-none focus:outline-none placeholder:text-black placeholder:font-bold caret-black "
      />
      <i className="fa-solid fa-magnifying-glass text-gray-400 text-lg px-4 "></i>
    </div>
        <button
          onClick={handleAddCategoryClick}
          className="bg-green text-white px-8 m-5 py-2 rounded-md flex items-center justify-center"
        >
          <i className="fa-solid fa-plus mr-2"></i> 
        </button>
      </div>

      {/* Scrollable container for the table */}
      <div className="overflow-x-auto">
    
  <table className="min-w-full bg-white shadow-md rounded-lg border">
    <thead className="bg-green text-white">
      <tr>
        <th className="py-3 px-4 uppercase text-left">Image</th>
        <th className="py-3 px-4 uppercase text-left">Product Name</th>
        <th className="py-3 px-4 uppercase text-left">Category</th>
        <th className="py-3 px-4 uppercase text-left">Subcategory</th>
        <th className="py-3 px-4 uppercase text-left">Price</th>
        <th className="py-3 px-4 uppercase text-left">Seller</th>
        <th className="py-3 px-4 uppercase text-left">Status</th>
        <th className="py-3 px-4 uppercase text-left">Action</th>
      </tr>
    </thead>
    <tbody>
      {Product.length > 0 ? (
        Product.map((item, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
            <td className="py-3 px-4">
              <img
                src={item.productImages?.images?.[0]?.image || "/placeholder.png"} 
                alt={item.product_name}
                className="w-14 h-14 object-cover rounded-lg"
              />
            </td>
            <td className="py-3 text-black px-4">{item.product_name}</td>
            <td className="py-3 text-black px-4">{item.category.category_name}</td>
            <td className="py-3 text-black px-4">{item.subCategory.subCategory_name}</td>
            <td className="py-3 text-black px-4 font-bold">${item.product_price}</td>
            <td className="py-3 text-black px-4">{item.user.user_name}</td>
            <td className="py-3 text-black px-4">
              <span className="px-3 py-1 rounded-full bg-gray-200 text-black text-sm">
                {item.product_status}
              </span>
            </td>
            <td className="py-3 px-4">
              <button
                onClick={() => handleViewAction(item)}
                className="px-4 py-2 text-sm font-semibold text-green-600 border border-green-600 rounded-lg hover:bg-green-600 hover:text-green transition duration-200 flex items-center gap-2"
              >
                View <i className="fa-solid fa-arrow-right text-lg"></i>
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="8" className="text-center py-5 text-gray-500">
            No data found
          </td>
        </tr>
      )}
    </tbody>
  </table>



      {selectedProduct && <ProductView product={selectedProduct} closePopup={closePopup} />}
    </div>
    </div>
  );
};

export default Table;
