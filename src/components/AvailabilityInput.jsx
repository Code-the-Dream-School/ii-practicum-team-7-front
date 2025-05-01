import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid';

function AvailabilityInput() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [availabilityList, setAvailabilityList] = useState([]);

    if (!selectedDate || !startTime || !endTime) return;

    const newSlot = {
        id: uuidv4(),
        Date: selectedDate.toISOString().split('T')[0],
        startTime,
        endTime,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }


}