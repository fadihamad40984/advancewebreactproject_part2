/* import React, { useState, useEffect } from "react";
import "../styles/addvillage.css"

const AddVillageModal = ({ isVisible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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

  if (!shouldRender) return null;
  return (
    <div className={`modal ${isVisible ? "show" : "hide"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Village</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div class="modal-body">
                <label for="villageNameAdd">Village Name:</label>
                <input type="text" id="villageNameAdd" required />

                <label for="regionDistrictAdd">Region/District:</label>
                <input type="text" id="regionDistrictAdd" required />

                <label for="landAreaAdd">Land Area (sq km):</label>
                <input type="number" id="landAreaAdd" required />

                <label for="latitudeAdd">Latitude:</label>
                <input type="number" id="latitudeAdd" required />

                <label for="longitudeAdd">Longitude:</label>
                <input type="number" id="longitudeAdd" required />

                <label for="uploadImageAdd">Upload Image:</label>
                <input type="file" id="uploadImageAdd" accept="image/*" />

                <label for="categoriesAdd">Categories/Tags:</label>
                <input
                  type="text"
                  id="categoriesAdd"
                  placeholder="e.g., rural, urban"
                />
              </div>
        <div className="modal-footer">
          <button id="addVillageBtn">Add Village</button>
        </div>
      </div>
    </div>
  );
};

export default AddVillageModal;  */


import React, { useState, useEffect } from "react";
import "../styles/addvillage.css"
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Swal from 'sweetalert2';


const ADD_VILLAGE = gql`
  mutation addVillage($input: VillageInput!) {
    addVillage(input: $input) {
      villageName
      region
      area
      latitude
      longitude
      tags
      demographic {
        populationSize
        ageDistribution
        genderRatio
        populationRate
      }
    }
  }
`;

const AddVillageModal = ({ isVisible, onClose }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // State variables to hold form data
  const [villageName, setVillageName] = useState("");
  const [region, setRegion] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tags, setTags] = useState("");

  const [addVillage, { loading, error, data }] = useMutation(ADD_VILLAGE);

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

  if (!shouldRender) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "villageNameAdd":
        setVillageName(value);
        break;
      case "regionDistrictAdd":
        setRegion(value);
        break;
      case "landAreaAdd":
        setArea(value);
        break;
      case "latitudeAdd":
        setLatitude(value);
        break;
      case "longitudeAdd":
        setLongitude(value);
        break;
      case "categoriesAdd":
        setTags(value);
        break;
      default:
        break;
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
      tags: tags || null, 
      male_population: null, 
      female_population: null,
      age_0_14: null,
      age_15_64: null,
      age_65_plus: null,
      growth_rate: null,
    };

    try {
      await addVillage({ variables: { input } });
        Swal.fire({
          title: 'Success!',
          text: 'Village added successfully!',
          icon: 'success',
          confirmButtonText: 'Close'
        });
    
      onClose(); 
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add village",
      });
      console.error("Error adding village:", err);
    }
  };

  return (
    <div className={`modal ${isVisible ? "show" : "hide"}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Village</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <label htmlFor="villageNameAdd">Village Name:</label>
            <input
              type="text"
              id="villageNameAdd"
              value={villageName}
              onChange={handleChange}
              required
            />

            <label htmlFor="regionDistrictAdd">Region/District:</label>
            <input
              type="text"
              id="regionDistrictAdd"
              value={region}
              onChange={handleChange}
              required
            />

            <label htmlFor="landAreaAdd">Land Area (sq km):</label>
            <input
              type="number"
              id="landAreaAdd"
              value={area}
              onChange={handleChange}
            />

            <label htmlFor="latitudeAdd">Latitude:</label>
            <input
              type="number"
              id="latitudeAdd"
              value={latitude}
              onChange={handleChange}
            />

            <label htmlFor="longitudeAdd">Longitude:</label>
            <input
              type="number"
              id="longitudeAdd"
              value={longitude}
              onChange={handleChange}
            />

                <label for="uploadImageAdd">Upload Image:</label>
                <input type="file" id="uploadImageAdd" accept="image/*" />

            <label htmlFor="categoriesAdd">Categories/Tags:</label>
            <input
              type="text"
              id="categoriesAdd"
              value={tags}
              placeholder="e.g., rural, urban"
              onChange={handleChange}
            />

            <div className="modal-footer">
              <button type="submit" id="addVillageBtn" disabled={loading}>
                {loading ? "Adding..." : "Add Village"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddVillageModal;
