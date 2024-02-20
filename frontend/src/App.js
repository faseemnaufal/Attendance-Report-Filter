import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceReport from './AttendanceReport';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/attendance');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <AttendanceReport data={data} />
        </>
      )}
    </div>
  );
}

export default App;
