import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

function AvailabilityInput() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availabilityList, setAvailabilityList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    const handleAvailability = () => {
        if (!selectedDate || !startTime || !endTime) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        setErrorMessage(''); 

        const newSlot = {
            id: uuidv4(),
            Date: selectedDate.toISOString().split('T')[0],
            startTime,
            endTime,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        };

        setAvailabilityList([...availabilityList, newSlot]);
        setSelectedDate(null);
        setStartTime('');
        setEndTime('');
    };

    const handleRemove = (id) => {
        setAvailabilityList(availabilityList.filter(slot => slot.id !== id));
    };

    return (
        <>
            <h3>Set Your Availability</h3>

            <label>Select Date:</label>
            <DatePicker selected={selectedDate} onChange={setSelectedDate} />

            <label>Set Start Time:</label>
            <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
            />

            <label>Set End Time:</label>
            <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
            />

            <button onClick={handleAvailability}>Add Availability</button>

            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

            <h3>Current Availability</h3>
            <ul>
                {availabilityList.map((slot) => (
                    <li key={slot.id}>
                        {slot.Date} | {slot.startTime} - {slot.endTime} ({slot.timeZone})
                        <button onClick={() => handleRemove(slot.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AvailabilityInput;
