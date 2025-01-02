import React, { useState, useEffect } from "react";
import "../styles/updatedemographic.css"
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Swal from 'sweetalert2';
import villageData from "C:\\Users\\fadih\\React projects\\advancewebreactproject_part2\\data\\villages.json";



var id;



const UPDATE_VILLAGE_DEMOGRAPHIC = gql`
  mutation updateDemographic($id: ID!, $input: VillageInputDemographic!) {
    updateDemographic(id: $id, input: $input) {
      male_population
      female_population
      age_0_14
      age_15_64
      age_65_plus
      growth_rate
    }
  }
`;



const DemographicVillageModal = ({ isVisible, onClose, village, onUpdate }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [formData, setFormData] = useState({
    populationSize: "",
    ageDistribution: "",
    genderRatio: "",
    populationRate: "",
  });

  const [populationSize, setPopulationSize] = useState("");
  const [ageDistribution, setAgeDistribution] = useState("");
  const [genderRatio, setGenderRatio] = useState("");
  const [populationRate, setPopulationRate] = useState("");
  const [male_population, setMale_population] = useState("");
  const [female_population, setFemale_population] = useState("");
  const [age_0_14, setAge_0_14] = useState("");
  const [age_15_64, setAge_15_64] = useState("");
  const [age_65_plus, setAge_65_plus] = useState("");
  const [villageId, setVillageId] = useState(null);
  const [updateDemographic, { loading, error, data }] = useMutation(UPDATE_VILLAGE_DEMOGRAPHIC);


  


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
    if (isVisible && village) {
      setFormData({
        populationSize: village.demographic?.populationSize || "",
        ageDistribution: village.demographic?.ageDistribution || "",
        genderRatio: village.demographic?.genderRatio || "",
        populationRate: village.demographic?.populationRate || "",
      });
      setShouldRender(true);
    } else {
      setShouldRender(false);
    }
  }, [isVisible, village]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "populationSize":
        setPopulationSize(value);
        break;
      case "ageDistribution":
        setAgeDistribution(value);
        break;
      case "genderRatio":
        setGenderRatio(value);
        break;
      case "populationRate":
        setPopulationRate(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const age0_14Match = ageDistribution.match(/0-14:\s*(\d+)%/);
    const age15_64Match = ageDistribution.match(/15-64:\s*(\d+)%/);
    const age65PlusMatch = ageDistribution.match(/65\+:\s*(\d+)%/);
    const age_0_14 = age0_14Match ? (parseInt(age0_14Match[1], 10) / 100) * populationSize : 0;
    const age_15_64 = age15_64Match ? (parseInt(age15_64Match[1], 10) / 100) * populationSize : 0;
    const age_65_plus = age65PlusMatch ? (parseInt(age65PlusMatch[1], 10) / 100) * populationSize : 0;
  

    const maleMatch = genderRatio.match(/Male:\s*(\d+)%/);
    const femaleMatch = genderRatio.match(/Female:\s*(\d+)%/);
  
    const male_population = maleMatch ? (parseInt(maleMatch[1], 10) / 100) * populationSize : 0;
    const female_population = femaleMatch ? (parseInt(femaleMatch[1], 10) / 100) * populationSize : 0;


    const input = {
      male_population,
      female_population,
      age_0_14, 
      age_15_64, 
      age_65_plus, 
      growth_rate: populationRate ? parseFloat(populationRate) : null, 

    };

        try {
          console.log("Submitting update with variables:", { id, input });
    
          await updateDemographic({ variables: { id,input } });
    
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



    // Call onUpdate to update the demographic data
  };

  if (!shouldRender) return null;

  return (
    <div className={`modalDemographic ${isVisible ? "show" : "hide"}`} id="demographicVillageModal">
      <div className="modal-content-demographic">
        <div className="modal-header-demographic">
          <h2 id="villageNameDemographic">{village.villageName}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body-demographic">
            <label htmlFor="populationSize">Population Size:</label>
            <input
              type="text"
              id="populationSize"
              name="populationSize"
              value={populationSize}
              onChange={handleChange}
              required
            />
            <label htmlFor="ageDistribution">Age Distribution:</label>
            <input
              type="text"
              id="ageDistribution"
              name="ageDistribution"
              value={ageDistribution}
              onChange={handleChange}
              placeholder="e.g., 0-14: 30%, 15-64: 60%, 65+:10%"
              required
            />
            <label htmlFor="genderRatio">Gender Ratios:</label>
            <input
              type="text"
              id="genderRatio"
              name="genderRatio"
              value={genderRatio}
              onChange={handleChange}
              placeholder="e.g., Male: 51%, Female: 49%"
              required
            />
            <label htmlFor="populationRate">Population Growth Rate:</label>
            <input
              type="number"
              id="populationRate"
              name="populationRate"
              value={populationRate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-footer-demographic">
            <button type="submit" id="updateDemographicDataBtn">
              Add Demographic Data
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DemographicVillageModal;
