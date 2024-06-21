'use client'
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection,addDoc } from 'firebase/firestore'

function StudentForm() {
  const [formData, setFormData] = useState({
    rollnumber: '',
    name: '',
    Branch: '',
    Latitude: '',
    Longitude: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'students'), formData);
      console.log('Form submitted:', formData);
      alert('Student data saved successfully!');
      setFormData({
        rollnumber: '',
        name: '',
        Branch: '',
        Latitude: '',
        Longitude: ''
      });
    } catch (error) {
      console.error('Error adding document:', error);
      alert('Error saving student data.');
    }
  };

  const handlegetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            Latitude: position.coords.latitude,
            Longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting user location:', error.message);
          alert(`Error getting user location: ${error.message}`);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center mb-2">Student Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="rollnumber">Roll Number:</label>
          <input
            type="text"
            id="rollnumber"
            name="rollnumber"
            value={formData.rollnumber}
            onChange={handleChange}
            className='border-2 p-1 outline-none ml-[10px]'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className='border-2 p-1 outline-none ml-[10px]'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="branch">Branch:</label>
          <input
            type="text"
            id="branch"
            name="Branch"
            value={formData.Branch}
            onChange={handleChange}
            className='border-2 p-1 outline-none ml-[10px]'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="latitude">Enter Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="Latitude"
            value={formData.Latitude}
            onChange={handleChange}
            className='border-2 p-1 outline-none ml-[10px]'
          />
        </div>
        <div className="mb-4">
          <label htmlFor="longitude">Enter Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="Longitude"
            value={formData.Longitude}
            onChange={handleChange}
            className='border-2 p-1 outline-none ml-[10px]'
          />
          <button
            type="button"
            className='bg-blue-500 p-[7px] ml-[1rem] text-white cursor-pointer rounded-[4px]'
            onClick={handlegetLocation}
          >
            Get Location
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Save
        </button>
      </form>
    </div>
  );
}

export default StudentForm;
