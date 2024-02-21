import React, { useState, useEffect, useMemo } from 'react';

const DropdownFilter = ({ onFilterChange, data }) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const departments = useMemo(() => [
    { label: "Front office", value: 1 },
    { label: "Housekeeping", value: 10 },
    { label: "Laundry", value: 11 },
    { label: "Engineering", value: 12 },
    { label: "Accounts & Admin", value: 13 },
    { label: "Executive", value: 14 },
    { label: "Casual Staff", value: 15 },
    { label: "Accounts", value: 2 },
    { label: "Stores", value: 3 },
    { label: "Time office", value: 4 },
    { label: "Hr & admin", value: 5 },
    { label: "Food & beverage", value: 6 },
    { label: "Banquets", value: 7 },
    { label: "Kitchen", value: 8 },
    { label: "Stewarding", value: 9 },
  ], []);

  const availableMonths = useMemo(() => {
    const uniqueMonths = Array.from(new Set(data.flatMap(employee => employee.punches.map(punch => punch.dateTime.slice(5, 7)))));
    return uniqueMonths.sort();
  }, [data]);

  const availableYears = useMemo(() => {
    const uniqueYears = Array.from(new Set(data.flatMap(employee => employee.punches.map(punch => punch.dateTime.slice(0, 4)))));
    return uniqueYears.sort();
  }, [data]);

  useEffect(() => {
    if (departments.length > 0) {
      setSelectedDepartment(departments[0].value);
    }

    if (availableMonths.length > 0) {
      setSelectedMonth(availableMonths[0]);
    }

    if (availableYears.length > 0) {
      setSelectedYear(availableYears[0]);
    }
  }, [departments, availableMonths, availableYears]);

  const handleFilterChange = () => {
    console.log("Filter changed:", selectedDepartment, selectedMonth, selectedYear);
    onFilterChange(selectedDepartment, selectedMonth, selectedYear);
  };

  return (
    <div className='filter'>
      <label htmlFor="department">Select Department:</label>
      <select
        id="department"
        name="department"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
      >
        {departments.map((department) => (
          <option key={department.value} value={department.value}>
            {department.label}
          </option>
        ))}
      </select>

      <label htmlFor="month">Select Month:</label>
      <select
        id="month"
        name="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      >
        {availableMonths.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>

      <label htmlFor="year">Select Year:</label>
      <select
        id="year"
        name="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        {availableYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      <button className='filterButton' onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default DropdownFilter;
