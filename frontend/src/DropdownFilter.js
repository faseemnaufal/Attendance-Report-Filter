import React, { useState, useEffect, useMemo } from 'react';

const DropdownFilter = ({ onFilterChange, data, initialDepartment, initialMonth, initialYear }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(initialDepartment);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

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

  const months = useMemo(() => [
    { label: "January", value: 1 },
    { label: "February", value: 2 },
    { label: "March", value: 3 },
    { label: "April", value: 4 },
    { label: "May", value: 5 },
    { label: "June", value: 6 },
    { label: "July", value: 7 },
    { label: "August", value: 8 },
    { label: "September", value: 9 },
    { label: "October", value: 10 },
    { label: "November", value: 11 },
    { label: "December", value: 12 },
  ], [data]);

  const years = useMemo(() => [
    { label: "2022", value: 2022 },
    { label: "2023", value: 2023 },
    { label: "2024", value: 2024 },
    { label: "2025", value: 2025 },
    { label: "2026", value: 2026 },
    { label: "2027", value: 2027 },
    { label: "2028", value: 2028 },
    { label: "2029", value: 2029 },
  ], [data]);

  // const availableYears = useMemo(() => {
  //   const uniqueYears = Array.from(new Set(data.flatMap(employee => employee.punches.map(punch => punch.dateTime.slice(0, 4)))));
  //   return uniqueYears.sort();
  // }, [data]);

  useEffect(() => {
    if (initialDepartment) {
      setSelectedDepartment(initialDepartment);
    } else if (departments.length > 0) {
      setSelectedDepartment(departments[0].value);
    }

    if (initialMonth) {
      setSelectedMonth(initialMonth);
    } else if (months.length > 0) {
      setSelectedMonth(months[0].value);
    }

    if (initialYear) {
      setSelectedYear(initialYear);
    } else if (years.length > 0) {
      setSelectedYear(years[0].value);
    }

    // if (availableYears.length > 0) {
    //   setSelectedYear(availableYears[0]);
    // }
  }, [initialDepartment, initialMonth, departments, months, initialYear, years]);

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
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
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
        {years.map((year) => (
          <option key={year.value} value={year.value}>
            {year.label}
          </option>
        ))}
      </select>

      <button className='filterButton' onClick={handleFilterChange}>Apply Filter</button>
    </div>
  );
};

export default DropdownFilter;
