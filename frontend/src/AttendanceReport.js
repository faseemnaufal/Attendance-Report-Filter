import React, { useRef } from 'react';
import './AttendanceReport.css';
import { useReactToPrint } from 'react-to-print';

function processPunches(employeeNumber, punchesArray) {
    const shifts = [
        { id: 1, startTime: "07:00:00", endTime: "16:00:00" },
        { id: 2, startTime: "13:00:00", endTime: "22:00:00" },
        { id: 3, startTime: "22:00:00", endTime: "07:00:00" }
    ];

    let result = [];

    punchesArray.forEach(punch => {
        let punchTime = new Date(punch.dateTime).getTime();

        let assignedShift = shifts.find(shift => {
            let shiftStartTime = new Date(punch.dateTime.split(" ")[0] + " " + shift.startTime).getTime();
            let shiftEndTime = new Date(punch.dateTime.split(" ")[0] + " " + shift.endTime).getTime();

            return Math.abs(punchTime - shiftStartTime) <= 3600000 || Math.abs(punchTime - shiftEndTime) <= 3600000;
        });

        if (assignedShift) {
            let punchType;
            let shiftStartTime = new Date(punch.dateTime.split(" ")[0] + " " + assignedShift.startTime).getTime();
            let shiftEndTime = new Date(punch.dateTime.split(" ")[0] + " " + assignedShift.endTime).getTime();

            if (Math.abs(punchTime - shiftStartTime) <= 3600000) {
                punchType = "In";
            } else if (Math.abs(punchTime - shiftEndTime) <= 3600000) {
                punchType = "Out";
            } else {
                // If punch does not fall around shift start or end time
                // you may need to handle this case based on your requirements
                punchType = "Unknown";
            }

            result.push({
                employeeNumber: employeeNumber,
                date: punch.dateTime.split(" ")[0],
                punchTime: punch.dateTime,
                punchType: punchType,
                shift: {
                    id: assignedShift.id,
                    startTime: assignedShift.startTime,
                    endTime: assignedShift.endTime
                }
            });
        }
    });

    return result;
}

const AttendanceReport = ({ data, filter }) => {
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
                                        const punchesForDay = processPunches(employee.employeeNumber, punches, filter).filter(punch => punch.date.startsWith(`2024-01-${dayString}`));
                                        const inPunch = punchesForDay.find(punch => punch.punchType === 'In');
                                        const outPunch = punchesForDay.find(punch => punch.punchType === 'Out');
                                        const startTime = inPunch ? inPunch.punchTime.slice(8, 16) : '';
                                        const endTime = outPunch ? outPunch.punchTime.slice(8, 16) : '';

                                        if (inPunch || outPunch) {
                                            totalWorkDays += 1;
                                        }

                                        const hasOnlyInOrOut = (inPunch && !outPunch) || (!inPunch && outPunch);

                                        return (
                                            <td key={i} className={`days ${hasOnlyInOrOut ? 'missing-both' : ''}`}>
                                                
                                                
                                                {/* Display shift times if available */}
                                                {punchesForDay.length > 0 && (
                                                    <div>
                                                        <div>
                                                            {inPunch ? `${startTime}(In)` : ''}
                                                        </div>

                                                        <div>Start:{punchesForDay[0].shift.startTime}</div>
                                                       
                                                        <div>
                                                            {outPunch ? `${endTime}(Out)` : ''}
                                                        </div>
                                                       
                                                        <div>End:{punchesForDay[0].shift.endTime}</div>
                                                    </div>
                                                )}

                                                
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
