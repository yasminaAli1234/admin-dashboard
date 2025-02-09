import React, { useState, useEffect } from 'react';
import { useGet } from '../../../Hooks/useGet';

const Rejected = () => {
  const [data, setData] = useState([]);

    const { refetch: refetchReject, loading: loadingReject, data: dataReject } = useGet({ url: 'https://marfaa-alex.com/api/admin/users'});
      const [Reject,setReject] = useState([])
      useEffect(() => {
        refetchReject()
      }, [refetchReject])
    
      useEffect(() => {
        if(dataReject){
          setReject(dataReject.rejected)
        }
        console.log("data Pending" , dataReject)
      }, [dataReject])

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

  return (
    <div className="text-black p-6">
      {/* <h1 className="text-2xl font-bold mb-4">Accepted Products</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-md bg-gray2">
            {/* First Row - Product and User Info */}
            <div className="flex items-center gap-4">
              <img
                src={item.userImage}
                alt={item.productName}
                className="w-24 h-24 rounded-md object-cover"
              />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{item.productName}</span>
                <span className="text-gray-500">by {item.userName}</span>
              </div>
        
            </div>
                     {/* Registration Date */}
                     <div className="mt-4">
              <span className="text-green">Registration Date:</span>
              <div className="font-bold">{item.registrationDate}</div>
            </div>

         

            {/* Contact Info */}
            <div className="mt-4 flex justify-between">
              <div>
                <span className="text-green">Phone:</span>
                <div className="font-medium">{item.phone}</div>
              </div>
              <div>
                <span className="text-green">Email:</span>
                <div className="font-medium">{item.email}</div>
              </div>
            </div>

            {/* Gallery and Location */}
            <div className="mt-4 border-t pt-4 flex justify-between items-center">
              <div className="flex gap-2">
                {item.gallery.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img src={item.img} alt="Gallery item" className="w-12 h-12 rounded-md" />
                    <span className="text-xs text-gray-500">{item.describtion}</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <div className="font-medium">{item.location}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rejected;
