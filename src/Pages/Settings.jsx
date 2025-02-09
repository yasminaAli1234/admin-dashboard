import React, { useEffect, useState } from "react";
import { useDelete } from "../Hooks/useDelete";
import { useGet } from "../Hooks/useGet";
import { usePost } from "../Hooks/usePostJson";
import { useAuth } from "../Context/Auth";

const Settings = () => {
  const [tab, setTab] = useState(0);
  const [cityName, setCityName] = useState("");
  const [areaName, setAreaName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [editCityId, setEditCityId] = useState(null);
  const [editAreaId, setEditAreaId] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [city, setCity] = useState([]);
  const [area, setArea] = useState([]);
  const auth = useAuth();

  const { deleteData: deleteCity } = useDelete();
  const { deleteData: deleteArea } = useDelete();
  const { refetch: refetchCity, data: dataCity } = useGet({ url: "https://marfaa-alex.com/api/admin/cities" });
  const { refetch: refetchArea, data: dataArea } = useGet({ url: "https://marfaa-alex.com/api/admin/areas" });
  const { postData: postCity } = usePost({ url: `https://marfaa-alex.com/api/admin/add/city` });
  const { postData: postArea } = usePost({ url: `https://marfaa-alex.com/api/admin/add/area` });

  useEffect(() => {
    refetchCity();
    refetchArea();
  }, []);

  useEffect(() => {
    if (dataCity) setCity(dataCity.cities);
  }, [dataCity]);

  useEffect(() => {
    if (dataArea) setArea(dataArea.areas);
  }, [dataArea]);

  const handleSubmitCity = () => {
    if (!cityName) return auth.toastError("Please enter a city name.");
    postCity({ name: cityName }, "City added successfully");
    refetchCity();
    setCityName("");
    setShowAddPopup(false);
  };

  const handleSubmitArea = () => {
    if (!areaName || !selectedCity) return auth.toastError("Please enter area name and select a city.");
    postArea({ name: areaName, city_id: selectedCity }, "Area added successfully");
    refetchArea();
    setAreaName("");
    setSelectedCity("");
    setShowAddPopup(false);
  };

  const handleUpdateCity = async (cityId) => {
    if (!cityName) return auth.toastError("Please enter a city name.");
    
    try {
      const response = await fetch(`https://marfaa-alex.com/api/admin/city/update/${cityId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
        
        body: JSON.stringify({ name: cityName }),
      });
  
      if (response.ok) {
        auth.toastSuccess("City updated successfully");
        refetchCity();
        setCityName("");
        setEditCityId(null);
      } else {
        auth.toastError("Failed to update city.");
      }
    } catch (error) {
      console.error("Error updating city:", error);
      auth.toastError("Something went wrong.");
    }
  };
  
  const handleUpdateArea = async (areaId) => {
    if (!areaName || !selectedCity) return auth.toastError("Please enter area name and select a city.");
    
    try {
      const response = await fetch(`https://marfaa-alex.com/api/admin/area/update/${areaId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.user?.token || ''}`,
          },
        body: JSON.stringify({ name: areaName, city_id: selectedCity }),
      });
  
      if (response.ok) {
        auth.toastSuccess("Area updated successfully");
        refetchArea();
        setAreaName("");
        setSelectedCity("");
        setEditAreaId(null);
      } else {
        auth.toastError("Failed to update area.");
      }
    } catch (error) {
      console.error("Error updating area:", error);
      auth.toastError("Something went wrong.");
    }
  };
  
  const handleDeleteCity = async (id, name) => {
    if (await deleteCity(`https://marfaa-alex.com/api/admin/city/delete/${id}`, `${name} deleted.`)) {
      setCity(city.filter((c) => c.id !== id));
      refetchCity();
    }
  };

  const handleDeleteArea = async (id, name) => {
    if (await deleteArea(`https://marfaa-alex.com/api/admin/area/delete/${id}`, `${name} deleted.`)) {
      setArea(area.filter((a) => a.id !== id));
      refetchArea();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-center space-x-4 mb-4">
        <button className={`px-4 py-2 rounded ${tab === 0 ? "bg-green text-white" : "bg-gray-300"}`} onClick={() => setTab(0)}>
          Cities
        </button>
        <button className={`px-4 py-2 rounded ${tab === 1 ? "bg-green text-white" : "bg-gray-300"}`} onClick={() => setTab(1)}>
          Areas
        </button>
      </div>

      {tab === 0 && (
        <div>
          <button className="bg-green-500 bg-green text-white px-4 py-2 rounded" onClick={() => setShowAddPopup(true)}>
            Add City
          </button>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {city.map((c) => (
              <div key={c.id} className="p-4 border rounded shadow">
                <h3 className="font-bold">{c.name}</h3>
                <div className="mt-2 flex space-x-2">
                  <button className="text-green" onClick={() => { setEditCityId(c.id); setCityName(c.name); }}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDeleteCity(c.id, c.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 1 && (
        <div>
          <button className="bg-green-500 bg-green text-white px-4 py-2 rounded" onClick={() => setShowAddPopup(true)}>
            Add Area
          </button>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {area.map((a) => (
              <div key={a.id} className="p-4 border rounded shadow">
                <h3 className="font-bold">{a.name}</h3>
                <p className="text-gray-500">City: {city.find((c) => c.id === a.city_id)?.name || "Unknown"}</p>
                <div className="mt-2 flex space-x-2">
                  <button className="text-green" onClick={() => { setEditAreaId(a.id); setAreaName(a.name); setSelectedCity(a.city_id); }}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDeleteArea(a.id, a.name)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(showAddPopup || editCityId !== null || editAreaId !== null) && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded">
            <h2 className="text-lg font-bold mb-2">
              {showAddPopup ? (tab === 0 ? "Add City" : "Add Area") : (editCityId ? "Edit City" : "Edit Area")}
            </h2>
            <input type="text" className="border p-2 w-full mb-2" value={tab === 0 ? cityName : areaName} onChange={(e) => tab === 0 ? setCityName(e.target.value) : setAreaName(e.target.value)} />
            {tab === 1 && (
              <select className="border p-2 w-full mb-2" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                <option value="">Select City</option>
                {city.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
            <div className="mt-4 flex justify-end space-x-2">
            <button
  className="bg-gray-300 px-4 py-2 rounded"
  onClick={() => {
    setShowAddPopup(false);
    setEditCityId(null);
    setEditAreaId(null);
    setCityName(""); 
    setAreaName("");
    setSelectedCity("");
  }}
>
  Cancel
</button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={showAddPopup ? (tab === 0 ? handleSubmitCity : handleSubmitArea) : (editCityId ?()=> handleUpdateCity(editCityId) : ()=> handleUpdateArea(editAreaId))}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
