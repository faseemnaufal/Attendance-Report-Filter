import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceReport from './AttendanceReport';
import DropdownFilter from './DropdownFilter';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/attendance?year=2024&month=1&department=${selectedDepartment}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setLoading(false);
    }
  };

  const handleFilterChange = (departmentId, selectedMonth, selectedYear) => {
    setSelectedDepartment(departmentId);
    fetchData();
  };

  return (
    <div>
      <DropdownFilter onFilterChange={handleFilterChange} data={data} />
      {loading ? <p>Loading...</p> : <AttendanceReport data={data} />}
    </div>
  );
}

export default App;
