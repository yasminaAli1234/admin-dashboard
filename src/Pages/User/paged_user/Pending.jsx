import React, { useState, useEffect } from 'react';
import { useGet } from '../../../Hooks/useGet';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../components/Loading';
import { Link } from 'react-router-dom';
const Pending = () => {
  const [data, setData] = useState([]);
  const auth = useAuth()
    const { refetch: refetchPending, loading: loadingPending, data: dataPending } = useGet({ url: 'https://marfaa-alex.com/api/admin/users'});
    const [Pending,setPending] = useState([])
    useEffect(() => {
      refetchPending()
    }, [refetchPending])
  
    useEffect(() => {
      if(dataPending){
        setPending(dataPending.pending)
      }
      console.log("data Pending" , dataPending)
    }, [dataPending])

  // Simulated data (replace this with API call when available)
  useEffect(() => {

    const mockData = [
      {
        id: 1,
        userImage: 'https://via.placeholder.com/150',
        productName: 'Product 1',
        userName: 'John Doe',
        registrationDate: '2024-01-01',
        phone: '123-456-7890',
        email: 'john@example.com',
        location: 'New York',
        gallery: [
          {img:'https://via.placeholder.com/50',describtion:"image1"},
          {img:'https://via.placeholder.com/50',describtion:"image2"},
          {img:'https://via.placeholder.com/50',describtion:"image3"}
          
        ],
      },
      {
        id: 2,
        userImage: 'https://via.placeholder.com/150',
        productName: 'Product 2',
        userName: 'Jane Smith',
        registrationDate: '2024-01-05',
        phone: '987-654-3210',
        email: 'jane@example.com',
        location: 'Los Angeles',
        gallery: [
          {img:'https://via.placeholder.com/50',describtion:"image1"},
          {img:'https://via.placeholder.com/50',describtion:"image2"}
          
        ],
      },
    ];
    setData(mockData);
  }, []);
  const handleReject = async (id) => {
    try {
      const response = await axios.put(
        `https://marfaa-alex.com/api/admin/user/reject/${id}`,
        {}, // Empty request body if not needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
        }
      );
  
      if (response.status === 200) {
        setPending((prevUsers) => prevUsers.filter((user) => user.id !== id));
        auth.toastSuccess("User rejected successfully!");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
      auth.toastError("Failed to reject user. Please try again.");
    }
  };
  
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `https://marfaa-alex.com/api/admin/user/accept/${id}`,
        {}, // Empty request body if not needed
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.token || ""}`,
          },
        }
      );
  
      if (response.status === 200) {
        setPending((prevUsers) => prevUsers.filter((user) => user.id !== id));
        auth.toastSuccess("User approved successfully!");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error approving user:", error);
      auth.toastError("Failed to approve user. Please try again.");
    }
  };
  
  if(loadingPending){
    return(
     <Loading/>
    )
  }
  

  return (
<div className="text-black p-6">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Pending.map((item) => (
       <Link
               to={`/update_user/${item.id}`}
               key={item.id}
               state={{ user: item }}
               className="border p-4 rounded-lg shadow-md bg-gray2 no-underline text-inherit hover:text-inherit min-w-0"
               onClick={() => setData(item)} // Set the data in context on click
             >

          {/* Product & User Info */}
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.first_name}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div className="flex flex-col flex-1">
              <span className="text-lg font-semibold">{item.productName}</span>
              <span className="text-gray-500">by {item.first_name} {item.last_name}</span>
            </div>
          </div>
  
          {/* Registration Date */}
          <div className="mt-3">
            <span className="text-gray-600">Registration Date:</span>
            <div className="font-bold text-black">{item.created_at}</div>
          </div>
  
          {/* Contact Info */}
          <div className="mt-3 flex flex-wrap gap-3">
            <div>
              <span className="text-gray-600">Phone:</span>
              <div className="font-medium text-black">{item.phone}</div>
            </div>
            <div>
              <span className="text-gray-600">Email:</span>
              <div className="font-medium text-black">{item.email}</div>
            </div>
          </div>
  
          {/* Gallery & Location */}
          <div className="mt-3 border-t pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {item.testproducts.map((galleryItem, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img src={galleryItem.img} alt="Gallery item" className="w-14 h-14 rounded-md" />
                  <span className="text-xs text-gray-500">{galleryItem.describtion}</span>
                </div>
              ))}
            </div>
            <div className='flex justify-between items-center'>
              <span className="text-gray-600">Location:</span>
              <div className="font-medium text-black">{item.full_address}</div>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-5 flex justify-between">
            <button
              onClick={() => handleReject(item.id)}
              className="px-4 py-2 text-sm font-bold text-red-600 bg-transparent border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition duration-200"
            >
              Reject
            </button>
            <button
              onClick={() => handleApprove(item.id)}
              className="px-4 py-2 text-sm font-bold text-green border border-green bg-green-500 rounded-lg hover:bg-green-600 transition duration-200"
            >
              Approve
            </button>
          </div>
        </Link>
      ))}
    </div>
  </div>
  
  

  );
};

export default Pending;
