import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import AddVillageModal from "../components/addvillage";
import UpdateVillageModal from "../components/updatevillage";
import UpdateDemographicModal from "../components/updatedemographic";
import ViewVillageModal from "../components/viewvillage";
import "../styles/villagemanagement.css";
import initialVillages from "/data/villages.json"; 
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Swal from 'sweetalert2';


const DELETE_VILLAGE = gql`
  mutation deleteVillage($id: ID!) {
    deleteVillage(id: $id)
  }
`;

 export const VillageManagement = () => {


  const [villages, setVillages] = useState(initialVillages);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVillage, setSelectedVillage] = useState(null);
  const [showModal, setShowModal] = useState(null); 
  const [deleteVillage] = useMutation(DELETE_VILLAGE);
  

  const rowsPerPage = 4;

    const generateTableRows = () => {
    const filteredVillages = villages.filter((village) =>
      village.villageName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredVillages.slice(start, end).map((village, index) => (
      <div key={index} className="row">
        <span>{village.villageName} - {village.region}</span>
        <button onClick={() => handleAction("view", village)}>View</button>
        <button onClick={() => handleAction("update", village)}>Update</button>
        <button onClick={() => handleDeleteVillage(village)}>Delete</button>
        <button onClick={() => handleAction("demographic", village)}>Update Demographics</button>
      </div>
    ));
  };

  const handlePagination = (direction) => {
    setCurrentPage((prev) => {
      const totalPages = Math.ceil(villages.length / rowsPerPage);
      if (direction === "prev" && prev > 1) return prev - 1;
      if (direction === "next" && prev < totalPages) return prev + 1;
      return prev;
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };

  const handleSort = (e) => {
    const sortValue = e.target.value;
    if (sortValue === "alphabetical") {
      setVillages((prev) => [...prev].sort((a, b) => a.villageName.localeCompare(b.villageName)));
    } else {
      setVillages(initialVillages); 
    }
  };

  const handleAction = (action, village) => {
    setSelectedVillage(village);
    setShowModal(action);
  };


  const handleDeleteVillage = async (village) => {
    const id = village.villageId; 
    console.log("ID to delete:", id);
  
    if (!id) {
      Swal.fire({
        icon: "error",
        title: "Invalid ID",
        text: "Village ID is missing!",
      });
      return;
    }
  
    try {
      const response = await deleteVillage({ variables: { id } });
      console.log("Delete response:", response);
  
      Swal.fire({
        title: "Success!",
        text: "Village deleted successfully!",
        icon: "success",
        confirmButtonText: "Close",
      });
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Failed to delete village",
      });
    }
  };
  

  const closeModal = () => {
    setShowModal(null);
    setSelectedVillage(null);
  };

  
  return (
    <Dashboard>
      <div className="villageManagement">
        <button className ="add-village-btn" onClick={() => setShowModal("add")}>Add New Village</button>

        <div className="village-list">
          <h2>View Village List</h2>
          <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search villages..."
            />
          </div>

          <div className="table">
            <div className="header">
              <div className="sortby">
                <span>Sort by: </span>
                <select onChange={handleSort}>
                  <option value="default">Default</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
              <div className="pagination">
                <button className="pagination-btn" onClick={() => handlePagination("prev")}>Prev</button>
                <span>Page: {currentPage}</span>
                <button className="pagination-btn" onClick={() => handlePagination("next")}>Next</button>
              </div>
            </div>

            <div className="rows">{generateTableRows()}</div>
          </div>
        </div>

        {showModal === "add" && <AddVillageModal isVisible={true} onClose={closeModal} />}
        {showModal === "update" && selectedVillage && (
          <UpdateVillageModal isVisible={true} onClose={closeModal} village={selectedVillage} />
        )}
         {showModal === "view" && selectedVillage && (
          <ViewVillageModal isVisible={true} onClose={closeModal} village={selectedVillage}  />
        )}
        {showModal === "demographic" && selectedVillage && (
          <UpdateDemographicModal isVisible={true} onClose={closeModal} village={selectedVillage}  />
        )}
      </div>
    </Dashboard>
  );
};

export default VillageManagement;
