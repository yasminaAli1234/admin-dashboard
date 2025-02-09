import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGet } from '../../Hooks/useGet';

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

  const handleViewAction = (product) => {
    alert(`View product details for ${product.product_name}`);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(data.map((item, index) => index));
    } else {
      setSelectedItems([]);
    }
  };

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
        <table className="overflow-x-auto min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-green border-b ">
            <tr>
              <th className="py-3 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === data.length && data.length > 0}
                  className="form-checkbox text-indigo-700 border-none w-6 h-6"
                />
              </th>
              <th className="py-3 px-2 uppercase">Image</th>
              <th className="py-3 px-2 uppercase">Prod. Name</th>
              <th className="py-3 px-2 uppercase">Seller Name</th>
              <th className="py-3 px-2 uppercase">Type</th>
              <th className="py-3 px-2 uppercase">Amount</th>
              <th className="py-3 px-2 uppercase">Submission Time</th>
              <th className="py-3 px-2 uppercase">Status</th>
              <th className="py-3 px-2 uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      className="form-checkbox text-indigo-600 w-6 h-5 outline-none border-none"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <img
                      src={item.image}
                      alt={item.productTitle}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 text-black px-4">{item.productTitle}</td>
                  <td className="py-3 text-black px-4">{item.productDescription}</td>
                  <td className="py-3 text-black px-4">{item.type}</td>
                  <td className="py-3 text-black px-4 font-bold">${item.productPrice}</td>
                  <td className="py-3 text-black px-4">
                    {new Date(item.date_submitted).toLocaleString()}
                  </td>
                  <td className="py-3 text-black px-4">
                    <span className="px-3 py-1 rounded-full text-main text-lg">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => handleViewAction(item)}
                      className="px-4 bg-transparent py-2 text-sm text-black rounded flex items-center gap-3 border-none"
                    >
                      View
                      <i className="fa-solid fa-arrow-right text-xl"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-5 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
