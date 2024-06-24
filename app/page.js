'use client'
import React, { useEffect, useState } from 'react';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from './firebaseConfig';
import StudentForm from './components/Form';
import Map from './components/Map';

async function fetchData(callback) {
  try {
    if (!db) {
      alert('Database is not Connected');
    }
    onSnapshot(collection(db, 'students'), (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      callback(data);
    });
  } catch (error) {
    console.log(error);
  }
}

function Page() {
  const [studata, setStuData] = useState([]);
  const [locationdata, setLocationData] = useState([])

  useEffect(() => {
    fetchData(setStuData);
    fetchData(setLocationData)
  }, []);


  const handleStudentLocation = (studentLocation) => {
    setLocationData([studentLocation])
  }

  const handleAllLocations = () => {
    fetchData(setLocationData)
  }

  return (
    <>
      <StudentForm />
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Students Portal</h1>
        <table className="table-auto mx-auto mb-[2rem] w-[90%]">
          <thead>
            <tr>
              <th className="px-4 py-2">Roll Number</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Branch</th>
              <th className="px-4 py-2">Latitude</th>
              <th className="px-4 py-2">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {studata.map((student, i) => (
              <tr key={i} onClick={() => handleStudentLocation(student)} className="bg-gray-100 cursor-pointer">
                <td className="border px-4 py-2 text-center">{student.rollnumber}</td>
                <td className="border px-4 py-2 text-center">{student.name}</td>
                <td className="border px-4 py-2 text-center">{student.Branch}</td>
                <td className="border px-4 py-2 text-center">{student.Latitude}</td>
                <td className="border px-4 py-2 text-center">{student.Longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => handleAllLocations()} className='bg-blue-500 p-[7px] ml-[1rem] mb-[1rem] text-white cursor-pointer rounded-[4px]'>Get All Locations</button>
      <Map locations={locationdata} />
    </>
  );
}

export default Page;


