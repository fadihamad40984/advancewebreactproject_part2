import React, { useState, useEffect } from "react";
import "../styles/updatevillage.css"
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Swal from 'sweetalert2';
import villageData from "C:\\Users\\fadih\\React projects\\advancewebreactproject_part2\\data\\villages.json";



var id;

const UPDATE_VILLAGE = gql`
  mutation updateVillage($id: ID!, $input: VillageInput!) {
    updateVillage(id: $id, input: $input) {
      villageName
      region
      area
      latitude
      longitude
    }
  }
`;




const UpdateVillageModal = ({ isVisible, onClose, village, onUpdate }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [formData, setFormData] = useState({
    villageName: village.villageName,
    region: village.region,
    area: village.landArea,
    latitude: village.latitude,
    longitude: village.longitude,
    image: null,
  });

    const [villageName, setVillageName] = useState("");
    const [region, setRegion] = useState("");
    const [area, setArea] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [villageId, setVillageId] = useState(null);
    const [updateVillage, { loading, error, data }] = useMutation(UPDATE_VILLAGE);
    const [imagePath, setImagePath] = useState(null); 


    


    const getVillageIdByName = (name) => {
      const village = villageData.find((v) => v.villageName === name);
      if (village) {
        setVillageId(village.villageId);
        id=village.villageId;
      } else {
        console.log(`Village with name ${name} not found.`);
      }
    };

  
    React.useEffect(() => {
      if (villageId !== null) {
        console.log(`Village ID: ${id}`);
      }
    }, [villageId]); 
  
     React.useEffect(() => {
      getVillageIdByName(village.villageName); 
    }, []); 

 

  useEffect(() => {
    
    if (isVisible) {
      setShouldRender(true);
      setTimeout(() => setIsAnimating(true), 10); 
    } else {
      setIsAnimating(false);
      const timeout = setTimeout(() => setShouldRender(false), 300); 
      return () => clearTimeout(timeout);
    }
  }, [isVisible]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "villageNameUpdate":
        setVillageName(value);
        break;
      case "regionDistrictUpdate":
        setRegion(value);
        break;
      case "landAreaUpdate":
        setArea(value);
        break;
      case "latitudeUpdate":
        setLatitude(value);
        break;
      case "longitudeUpdate":
        setLongitude(value);
        break;
      default:
        break;
    }
  };


  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const image_path = '/images/'+file.name;
      setImagePath(image_path);  
      console.log("File name saved:", image_path);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {
      villageName,
      region,
      area: area ? parseFloat(area) : null, 
      latitude: latitude ? parseFloat(latitude) : null, 
      longitude: longitude ? parseFloat(longitude) : null, 
      imagePath,
    };

    try {
      console.log("Submitting update with variables:", { id, input });

      await updateVillage({ variables: { id,input } });

        Swal.fire({
          title: 'Success!',
          text: 'Village updated successfully!',
          icon: 'success',
          confirmButtonText: 'Close'
        });
    
      onClose(); 
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
      console.error("Error adding village:", err);
    }
  };

  if (!shouldRender) return null;

  return (
    <div className={`modalUpdate ${isVisible ? "show" : "hide"}`} id="updateVillageModal">
      <div className="modal-content-update">
        <div className="modal-header-update">
          <h2>Update Village</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body-update">
            <label htmlFor="villageNameUpdate">Village Name:</label>
            <input
              type="text"
              id="villageNameUpdate"
              name="villageName"
              value={villageName}
              onChange={handleChange}
              required
            />
            <label htmlFor="regionDistrictUpdate">Region/District:</label>
            <input
              type="text"
              id="regionDistrictUpdate"
              name="region"
              value={region}
              onChange={handleChange}
              required
            />
            <label htmlFor="landAreaUpdate">Land Area (sq km):</label>
            <input
              type="number"
              id="landAreaUpdate"
              name="landArea"
              value={area}
              onChange={handleChange}
              required
            />
            <label htmlFor="latitudeUpdate">Latitude:</label>
            <input
              type="number"
              id="latitudeUpdate"
              name="latitude"
              value={latitude}
              onChange={handleChange}
              required
            />
            <label htmlFor="longitudeUpdate">Longitude:</label>
            <input
              type="number"
              id="longitudeUpdate"
              name="longitude"
              value={longitude}
              onChange={handleChange}
              required
            />
            <label htmlFor="uploadImageUpdate">Upload Image:</label>
            <input
              type="file"
              id="uploadImageUpdate"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imagePath && (
              <div>
                <p>Preview:</p>
                <img src={imagePath} alt="Preview" style={{ width: "100px", height: "100px" }} />
              </div>
            )}
{/*             <label htmlFor="uploadImageUpdate">Upload Image:</label>
            <input
              type="file"
              id="uploadImageUpdate"
              name="image"
              accept="image/*"
            /> */}
          </div>
          <div className="modal-footer-update">
            <button type="submit" id="updateVillageBtn" disabled={loading}>
            {loading ? "Updating..." : "Update Village"}            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVillageModal;
