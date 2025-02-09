import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../../Context/data';
import { useGet } from '../../../Hooks/useGet';
import Loading from '../../../components/Loading';


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
  // useEffect(() => {
  //   const mockData = [
  //     {
  //       id: 1,
  //       userImage: 'https://via.placeholder.com/150',
  //       productName: 'Product 1',
  //       userName: 'John Doe',
  //       state:'accept',
  //       registrationDate: '2024-01-01',
  //       phone: '123-456-7890',
  //       email: 'john@example.com',
  //       address:'mamouravggsfstfts shuysy7y',
  //       location: 'New York',
  //       genders:'femal',
  //       nationalID:'hello',
  //       cities:'Chicago',
  //       areas:'Area 2',
  //       gallery: [
  //         { img: 'https://via.placeholder.com/50', describtion: 'image1' },
  //         { img: 'https://via.placeholder.com/50', describtion: 'image2' },
  //         { img: 'https://via.placeholder.com/50', describtion: 'image3' }
  //       ],
  //     },
  //     {
  //       id: 2,
  //       userImage: 'https://via.placeholder.com/150',
  //       productName: 'Product 2',
  //       userName: 'Jane Smith',
  //       state:'accept',
  //       address:'mamouravggsfstfts shuysy7y',
  //       registrationDate: '2024-01-05',
  //       phone: '987-654-3210',
  //       email: 'jane@example.com',
  //       nationalID:'hello',
  //       location: 'Los Angeles',
  //       genders:'femal',
  //       cities:'Chicago',
  //       areas:'Area 2',
  //       gallery: [
  //         { img: 'https://via.placeholder.com/50', describtion: 'image1' },
  //         { img: 'https://via.placeholder.com/50', describtion: 'image2' }
  //       ],
  //     },
  //   ];
  //   setDataState(mockData);
  // }, []);

  if(loadingAccept){
    return(
     <Loading/>
    )
  }

  return (
    <div className="text-black p-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {accept.map((item) => (
        <Link
          to={`/update_user/${item.id}`}
          key={item.id}
          state={{ user: item }}
          className="border p-4 rounded-lg shadow-md bg-gray2 no-underline text-inherit hover:text-inherit min-w-0"
          onClick={() => setData(item)} // Set the data in context on click
        >
          {/* Product and User Info */}
          <div className="flex items-center gap-4 overflow-hidden">
            <img
              src={item.image}
              alt={item.productName}
              className="w-24 h-24 rounded-md object-cover min-w-24"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-semibold truncate">{item.first_name}</span>
              <span className="text-gray-500 truncate">by {item.last_name}</span>
            </div>
          </div>
          {/* Registration Date */}
          <div className="mt-4">
            <span className="text-green">Registration Date:</span>
            <div className="font-bold truncate">{item.created_at}</div>
          </div>
          {/* Contact Info */}
          <div className="mt-4 flex justify-between overflow-hidden">
            <div className="min-w-0">
              <span className="text-green">Phone:</span>
              <div className="font-medium truncate">{item.phone}</div>
            </div>
            <div className="min-w-0">
              <span className="text-green">Email:</span>
              <div className="font-medium truncate">{item.email}</div>
            </div>
          </div>
          {/* Gallery and Location */}
          <div className="mt-4 border-t pt-4 flex justify-between items-center overflow-hidden">
            <div className="min-w-0">
              <span className="text-gray-600">Location:</span>
              <div className="font-medium truncate">{item.full_address}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  
  );
};

export default Accepted;
