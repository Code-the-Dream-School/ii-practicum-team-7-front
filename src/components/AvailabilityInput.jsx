import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

function AvailabilityInput() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availabilityList, setAvailabilityList] = useState([]);


    const handleAvailability = () => {
        if (!selectedDate || !startTime || !endTime) return;

    const newSlot = {
        id: uuidv4(),
        Date: selectedDate.toISOString().split('T')[0],
        startTime,
        endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    setAvailabilityList([...availabilityList, newSlot])
    setSelectedDate(null)
    setStartTime('')
    setEndTime('')

    };

    const handdleRemove = (id) => {
        setAvailabilityList(availabilityList.filter(slot => slot.id !== id))
    }

    return (
        <>
            <h3>Set Your Availability</h3>
            <label>Select Date:</label>
            <DatePicker selected={selectedDate} onChange={setSelectedDate}/>

            <label>Set Start Time:</label>
            <input 
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}

            
            />

            <label>Set End Time:</label>
            <input 
                
            />
        </>
    )
    

}