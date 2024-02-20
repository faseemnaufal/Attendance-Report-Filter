import React, { useRef } from 'react';
import './AttendanceReport.css';
import { useReactToPrint } from 'react-to-print';


const AttendanceReport = ({ data }) => {
    const contentToPrint = useRef(null);
    const handlePrint = useReactToPrint({
      documentTitle: "Attendance Report",
      removeAfterPrint: true,
    });
  
    const daysInMonth = 31;
  
    const allColumns = [
      <React.Fragment key="Employee">
        Employee <br /> Number
      </React.Fragment>,
    ];
  
    for (let day = 1; day <= daysInMonth; day++) {
      const date = `2024-01-${String(day).padStart(2, '0')}`;
      allColumns.push(
        <React.Fragment key={day}>
          {`Day ${day}`}
          <br />
          {`${date}`}
        </React.Fragment>
      );
    }
  
    allColumns.push(
      <React.Fragment key="TotalWorkDays">
        Total Work Days
      </React.Fragment>
    );
  
    return (
      <>
        <div className='report' ref={contentToPrint}>
          <h2 className='heading'>Attendance Report</h2>
          <table className="attendance-table">
            <thead>
              <tr>
                {allColumns.map((column, columnIndex) => (
                  <th key={columnIndex}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((employee, index) => {
                let totalWorkDays = 0;
  
                return (
                  <tr key={index}>
                    <td>{employee.employeeNumber}</td>
                    {Array.from({ length: daysInMonth }, (_, i) => {
                      const dayString = String(i + 1).padStart(2, '0');
                      const punches = employee.punches || [];
                      const punchesForDay = punches.filter(punch => punch.dateTime.startsWith(`2024-01-${dayString}`));
                      const inPunch = punchesForDay.find(punch => punch.type === 'in');
                      const outPunch = punchesForDay.find(punch => punch.type === 'out');
                      const startTime = inPunch ? inPunch.dateTime.slice(8, 16) : '';
                      const endTime = outPunch ? outPunch.dateTime.slice(8, 16) : '';
  
                      if (inPunch || outPunch) {
                        totalWorkDays += 1;
                      }
  
                      const hasOnlyInOrOut = (inPunch && !outPunch) || (!inPunch && outPunch);
  
                      return (
                        <td key={i} className={`days ${hasOnlyInOrOut ? 'missing-both' : ''}`}>
                          <div>
                            {inPunch ? `${startTime}(In)` : ''}
                          </div>
                          <div>
                            {outPunch ? `${endTime}(Out)` : ''}
                          </div>
                        </td>
                      );
                    })}
                    <td>{totalWorkDays}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        <div style={{ marginLeft: 'auto' }}>
          <button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
            className="printButton"
          >
            PRINT
          </button>
        </div>
      </>
    );
  };
  
  export default AttendanceReport;
  
  