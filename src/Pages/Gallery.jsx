import React, { useState, useEffect } from "react";
import "../styles/gallery.css"; 
import Dashboard from "../components/Dashboard";
import { useMutation } from "@apollo/client";
import { gql } from "graphql-tag";
import Swal from "sweetalert2";
import initialImages from "/data/gallery.json"; 

const ADD_IMAGE = gql`
  mutation addImage($input: ImageInput!) {
    addImage(input: $input)
  }
`;

const Gallery = () => {
  const [images, setImages] = useState([]); // State to hold images
  const [modalVisible, setModalVisible] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [description, setDescription] = useState("");
  const [user, setUser] = useState(null);
  const [addImageMutation, { loading, error }] = useMutation(ADD_IMAGE);

  useEffect(() => {
    setImages(initialImages);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imagePath = "/images/" + file.name;
      setNewImage(imagePath);
      console.log("File name saved:", imagePath);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addImage = async (e) => {
    e.preventDefault();

    if (!newImage || !description) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please provide both an image and a description.",
      });
      return;
    }

    const newImageData = {
      imagePath: newImage,
      imageDescription: description,
    };

    try {
      await addImageMutation({ variables: { input: newImageData } });
      Swal.fire({
        title: "Success!",
        text: "Image added successfully!",
        icon: "success",
        confirmButtonText: "Close",
      });

      setImages([...images, newImageData]);
      setNewImage(null);
      setDescription("");
      closeModal();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to add image",
      });
      console.error("Error adding image:", err);
    }
  };


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  if (!user) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }
  
  if (user.role === "user") {
    return (
      <Dashboard>  
      <div>
      <h2>Unauthorized Access</h2>
      <p>You do not have the necessary permissions to access this page.</p>
    </div>
    </Dashboard>

    );
  }


  else{

  

  

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
                  <img src={img.image_path} alt={`Image ${index + 1}`} />
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
}
};

export default Gallery;
