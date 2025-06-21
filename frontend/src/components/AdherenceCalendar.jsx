import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdherenceCalendar = ({ patientId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function fetchCalendar() {
      try {
        const res = await axios.get(`/api/patients/${patientId}/adherence`);
        setRecords(res.data);
      } catch (err) {
        console.error('Failed to load adherence', err);
      }
    }
    if (patientId) {
      fetchCalendar();
    }
  }, [patientId]);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const getDaysInMonth = () =>
    new Date(currentYear, currentMonth + 1, 0).getDate();

  const getStatusForDay = (day) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const entry = records.find((r) => r.date === dateStr);
    return entry?.status || 'none';
  };

  const getColor = (status) => {
    if (status === 'taken') return '#4caf50';
    if (status === 'missed') return '#f44336';
    return '#e0e0e0';
  };

  const renderCalendar = () => {
    const days = getDaysInMonth();
    const squares = [];

    for (let day = 1; day <= days; day++) {
      const status = getStatusForDay(day);
      squares.push(
        <div
          key={day}
          style={{
            width: 36,
            height: 36,
            margin: 4,
            borderRadius: '50%',
            display: 'inline-block',
            textAlign: 'center',
            lineHeight: '36px',
            backgroundColor: getColor(status),
            color: 'white',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: 280 }}>
        {squares}
      </div>
    );
  };

  return (
    <div>
      <h3>📅 Adherence Calendar for Patient {patientId}</h3>
      {renderCalendar()}
    </div>
  );
};

export default AdherenceCalendar;
