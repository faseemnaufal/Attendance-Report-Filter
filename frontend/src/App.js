import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceReport from './AttendanceReport';
import DropdownFilter from './DropdownFilter';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    year: 2024,
    month: 1,
    department_id: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/api/attendance?year=${filter.year}&month=${filter.month}&department=${filter.department_id}`);
        const apiData = response.data;

        const processedData = apiData.map(record => {
          return {
            employeeNumber: record.employeeNumber,
            punches: record.punches, 
          };
        });

        setData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  const handleFilterChange = (departmentId, selectedMonth, selectedYear) => {
    console.log("Filter changed in App:", departmentId, selectedMonth, selectedYear);
    setFilter({
      ...filter,
      department_id: departmentId,
      month: selectedMonth,
      year: selectedYear,
    });
  };

  return (
    <div>
      <DropdownFilter onFilterChange={handleFilterChange} data={data} />
      {loading ? <p>Loading...</p> : <AttendanceReport data={data} filter={filter}/>}
    </div>
  );
}

export default App;
