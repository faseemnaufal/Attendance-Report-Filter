import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttendanceReport from './AttendanceReport';
import DropdownFilter from './DropdownFilter';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
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
  }, []);

   
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
  
    //const month = selectedMonth || filter.month;
    const year = selectedYear || filter.year;
  
    setFilter({
      ...filter,
      department_id: departmentId,
      month: selectedMonth,
      year: year,
    });
  };
  

  return (
    <div>
      <DropdownFilter onFilterChange={handleFilterChange} data={data} initialDepartment={filter.department_id} initialMonth={filter.month} initialYear={filter.year}/>
      {loading ? <p>Loading...</p> : <AttendanceReport data={data} filter={filter}/>}
    </div>
  );
}

export default App;
