import React, { useEffect, useState } from 'react';
import { useData } from '../../../Context/data';
import { useGet } from '../../../Hooks/useGet';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { CircularProgress, MenuItem, TextField, Button, Menu } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateUser = () => {
  const { id } = useParams();
  const location = useLocation();
  const { refetch: refetchCity, loading: cityLoading, data: dataCity } = useGet({ url: "https://marfaa-alex.com/api/admin/cities" });
  const { refetch: refetchArea, loading: areaLoading, data: dataArea } = useGet({ url: "https://marfaa-alex.com/api/admin/areas" });
  const genders = ['male', 'female'];
  const navigate = useNavigate();
  const [userData, setUserData] = useState(location.state?.user || {});
  const [cityID, setCityID] = useState(userData.city_id || '');
  const [areaID, setAreaID] = useState(userData.area_id || '');
  const [firstName, setFirstName] = useState(userData.first_name || '');
  const [lastName, setLastName] = useState(userData.last_name || '');
  const [phone, setPhone] = useState(userData.phone || '');
  const [selectedGender, setSelectedGender] = useState(userData.gender || '');
  const [age, setAge] = useState(userData.age || '');
  const [fullAddress, setFullAddress] = useState(userData.full_address || '');
  const [nationalID, setNationalID] = useState('');
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const auth = useAuth();
  useEffect(() => {
    refetchCity();
    refetchArea();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`https://marfaa-alex.com/api/admin/user/update/${id}`, {
        city_id: cityID,
        area_id: areaID,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        gender: selectedGender,
        age: age,
        full_address: fullAddress,
        national_id: nationalID,
      }, {
        headers: {
          Authorization: `Bearer ${auth.user?.token || ""}`,
          "Content-Type": "application/json",
        },
      });
      auth.toastSuccess('User updated successfully');
      navigate(-1);
    } catch (error) {
      auth.toastError('Failed to update user');
    }
    setLoading(false);
  };

    // Open/close dropdown
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };

  const updateUserStatus = async (status) => {
    const url = `https://marfaa-alex.com/api/admin/user/${status}/${id}`;
    try {
      await axios.put(url, {}, {
        headers: {
          Authorization: `Bearer ${auth.user?.token || ""}`,
          "Content-Type": "application/json",
        },
      });
      auth.toastSuccess(`User ${status} successfully`);
    } catch (error) {
      auth.toastError(`Failed to ${status} user`);
    }
    handleClose();
  };

  return (
    <div className="p-6 text-black">
      {/* User Profile Section */}
  
      <div className="flex items-center justify-between gap-6 mb-6">

      {/* User Info */}
      <div className="flex items-center gap-6">
      <FaArrowLeft className="text-4xl cursor-pointer text-green" onClick={()=>navigate(-1)} />
        <img src={userData.image || "/default-avatar.png"} alt="Profile" className="w-24 h-24 rounded-full" />
        <div>
          <h1 className="text-2xl font-semibold">{firstName} {lastName}</h1>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/* Action Button with Dropdown */}
      <div>
        <button className='bg-green text-white p-2' onClick={handleClick}>
          Actions
        </button>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => updateUserStatus("accept")}>Accept</MenuItem>
          <MenuItem onClick={() => updateUserStatus("reject")}>Reject</MenuItem>
          <MenuItem onClick={() => updateUserStatus("suspend")}>Suspend</MenuItem>
        </Menu>
      </div>
    </div>

      {/* Input Fields */}
      <div className="grid grid-cols-2 gap-4">
        <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
        <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
        <TextField select label="Gender" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} fullWidth>
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
          ))}
        </TextField>
        <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
        <TextField select label="City" value={cityID} onChange={(e) => setCityID(e.target.value)} fullWidth>
          {cityLoading ? <CircularProgress size={24} /> : dataCity?.cities?.map((city) => (
            <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Area" value={areaID} onChange={(e) => setAreaID(e.target.value)} fullWidth>
          {areaLoading ? <CircularProgress size={24} /> : dataArea?.areas?.map((area) => (
            <MenuItem key={area.id} value={area.id}>{area.name}</MenuItem>
          ))}
        </TextField>
        <TextField label="National ID" type="file" onChange={(e) => setNationalID(e.target.files[0])} fullWidth />
      </div>

      {/* Address Field */}
      <div className="mt-4">
        <TextField label="Full Address" value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} fullWidth />
      </div>

      {/* User Products */}
      {userData.products && userData.products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">User Products</h3>
          <div className="flex gap-4 overflow-x-auto">
            {userData.products.map((product, index) => (
              <img key={index} src={product.image} alt={product.name} className="w-20 h-20 rounded-md" />
            ))}
          </div>
        </div>
      )}

      {/* Update Button */}
      <button className="mt-10 bg-green text-white  px-6 py-2 rounded-md" onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update User'}
      </button>
    </div>
  );
};

export default UpdateUser;
