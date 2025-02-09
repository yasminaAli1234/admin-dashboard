import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../../Context/data';
import { useGet } from '../../../Hooks/useGet';


const Accepted = () => {
  const [data, setDataState] = useState([]);
  const { setData } = useData()
  
    const { refetch: refetchAccept, loading: loadingAccept, data: dataAccept } = useGet({ url: 'https://marfaa-alex.com/api/admin/users'});
    const [accept,setAccept] = useState([])
    useEffect(() => {
      refetchAccept()
    }, [refetchAccept])
  
    useEffect(() => {
      if(dataAccept){
        setAccept(dataAccept.accepted)
      }
      console.log("data Accept" , dataAccept)
    }, [dataAccept])
  

  // Simulated data (replace this with an API call)
  useEffect(() => {
    const mockData = [
      {
        id: 1,
        userImage: 'https://via.placeholder.com/150',
        productName: 'Product 1',
        userName: 'John Doe',
        state:'accept',
        registrationDate: '2024-01-01',
        phone: '123-456-7890',
        email: 'john@example.com',
        address:'mamouravggsfstfts shuysy7y',
        location: 'New York',
        genders:'femal',
        nationalID:'hello',
        cities:'Chicago',
        areas:'Area 2',
        gallery: [
          { img: 'https://via.placeholder.com/50', describtion: 'image1' },
          { img: 'https://via.placeholder.com/50', describtion: 'image2' },
          { img: 'https://via.placeholder.com/50', describtion: 'image3' }
        ],
      },
      {
        id: 2,
        userImage: 'https://via.placeholder.com/150',
        productName: 'Product 2',
        userName: 'Jane Smith',
        state:'accept',
        address:'mamouravggsfstfts shuysy7y',
        registrationDate: '2024-01-05',
        phone: '987-654-3210',
        email: 'jane@example.com',
        nationalID:'hello',
        location: 'Los Angeles',
        genders:'femal',
        cities:'Chicago',
        areas:'Area 2',
        gallery: [
          { img: 'https://via.placeholder.com/50', describtion: 'image1' },
          { img: 'https://via.placeholder.com/50', describtion: 'image2' }
        ],
      },
    ];
    setDataState(mockData);
  }, []);

  return (
    <div className="text-black p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item) => (
          <Link
            to="/user/info"
            key={item.id}
             className="border p-4 rounded-lg shadow-md bg-gray2 no-underline text-inherit hover:text-inherit"
            onClick={() => setData(item)} // Set the data in context on click
          >
            {/* Product and User Info */}
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
                {item.gallery.map((imgItem, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <img
                      src={imgItem.img}
                      alt={`Gallery ${index}`}
                      className="w-12 h-12 rounded-md"
                    />
                    <span className="text-xs text-gray-500">{imgItem.describtion}</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <div className="font-medium">{item.location}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Accepted;
