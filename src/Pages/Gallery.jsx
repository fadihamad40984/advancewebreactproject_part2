import React, { useState } from "react";
import "../styles/gallery.css"; 
import Dashboard from "../components/Dashboard";

const Gallery = () => {
  const [images, setImages] = useState([]); // To store the gallery images
  const [modalVisible, setModalVisible] = useState(false); // To toggle the modal visibility
  const [newImage, setNewImage] = useState(null); // To store the new image file
  const [description, setDescription] = useState(""); // To store the image description

  // Handle opening the modal
  const openModal = () => {
    setModalVisible(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setModalVisible(false);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    setNewImage(event.target.files[0]);
  };

  // Handle image description input
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // Handle adding a new image
  const addImage = () => {
    if (newImage && description) {
      const newImageData = {
        image: URL.createObjectURL(newImage), // Create a URL for the image
        description: description,
      };

      // Update the gallery with the new image
      setImages([...images, newImageData]);
      setModalVisible(false); // Close the modal
      setNewImage(null); // Clear the input
      setDescription(""); // Clear the description
    }
  };

  return (
    <Dashboard>
    <div>
  
      <div className="gallery">
        <div className="gallery-container">
          <button className="add-image" onClick={openModal}>
            Add New Image
          </button>

          <div className="image-grid">
            {images.map((img, index) => (
              <div key={index} className="image-item">
                <img src={img.image} alt={`Image ${index + 1}`} />
                <p>{img.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalVisible && (
        <div className="modalAddImage">
          <div className="modal-content-image">
            <div className="modal-header-image">
              <h2>Add Image</h2>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body-image">
              <label htmlFor="uploadImageAdd1">Upload Image:</label>
              <input
                type="file"
                id="uploadImageAdd1"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />

              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </div>
            <div className="modal-footer-image">
              <button onClick={addImage}>Add Image</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Dashboard>
  );
};

export default Gallery;
