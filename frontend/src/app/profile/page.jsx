"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleUpdate = () => {
    alert(`Name: ${name}\nEmail: ${email}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.profileImageContainer}> 
          <img src="/default-profile.jpg" alt="Profile" style={styles.profileImage} />
        </div>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.email}>{email}</p>
        <div style={styles.uploadBox}>
          <p>Drag & Drop or Click to Upload Resume</p>
          <input type="file" style={styles.fileInput} />
        </div>
        <button onClick={handleUpdate} style={styles.button}>Update Profile</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#F8F4F1", // Changed background to off-white
  },
  profileCard: {
    width: "350px",
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  profileImageContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
  },
  profileImage: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #A67B5B",
  },
  name: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#5A3827",
  },
  email: {
    fontSize: "14px",
    color: "#7A5A44",
    marginBottom: "15px",
  },
  uploadBox: {
    border: "2px dashed #A67B5B",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "5px",
    cursor: "pointer",
    textAlign: "center",
    color: "#5A3827",
  },
  fileInput: {
    display: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "linear-gradient(90deg, #A67B5B, #5A3827)",
    color: "#FFFFFF",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};