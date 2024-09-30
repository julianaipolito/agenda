import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendario.css';
import Holidays from 'date-holidays';

const Calendario = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventDescription, setEventDescription] = useState('');
  const [meetingLink, setMeetingLink] = useState('');
  const [eventStartTime, setEventStartTime] = useState('');
  const [eventEndTime, setEventEndTime] = useState('');
  const [feriados, setFeriados] = useState([]);

  const hd = new Holidays('BR');

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const holidaysForYear = hd.getHolidays(year);
    const formattedHolidays = holidaysForYear.map(holiday => ({
      ...holiday,
      date: holiday.date.split(' ')[0],
    }));
    setFeriados(formattedHolidays);
  }, [selectedDate]);

  const brTimeZone = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' });

  const checkTimeCollision = (dateKey, startTime, endTime) => {
    if (!events[dateKey]) return false;

    return events[dateKey].some(event => {
      return (
        (startTime >= event.startTime && startTime < event.endTime) || 
        (endTime > event.startTime && endTime <= event.endTime) ||
        (startTime <= event.startTime && endTime >= event.endTime)
      );
    });
  };

  const handleAddEvent = () => {
    if (!eventDescription || !eventStartTime || !eventEndTime) {
      alert('Por favor, preencha a descrição do evento, o horário de início e de fim.');
      return;
    }

    const dateKey = selectedDate.toDateString();
    const newEvents = { ...events };

    if (checkTimeCollision(dateKey, eventStartTime, eventEndTime)) {
      alert('Já existe um evento nesse horário!');
      return;
    }

    if (!newEvents[dateKey]) {
      newEvents[dateKey] = [];
    }

    newEvents[dateKey].push({ 
      description: eventDescription, 
      startTime: eventStartTime, 
      endTime: eventEndTime 
    });

    setEvents(newEvents);
    setEventDescription('');
    setEventStartTime('');
    setEventEndTime('');
  };

  const handleAddMeeting = () => {
    if (!meetingLink || !eventStartTime || !eventEndTime) {
      alert('Por favor, preencha o link da reunião, o horário de início e de fim.');
      return;
    }

    const dateKey = selectedDate.toDateString();
    const newEvents = { ...events };

    if (checkTimeCollision(dateKey, eventStartTime, eventEndTime)) {
      alert('Já existe uma reunião nesse horário!');
      return;
    }

    if (!newEvents[dateKey]) {
      newEvents[dateKey] = [];
    }

    newEvents[dateKey].push({ 
      description: `Meeting: ${meetingLink}`, 
      startTime: eventStartTime, 
      endTime: eventEndTime 
    });

    setEvents(newEvents);
    setMeetingLink('');
    setEventStartTime('');
    setEventEndTime('');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dateKey = now.toDateString();
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (events[dateKey]) {
        events[dateKey].forEach(event => {
          if (event.startTime === currentTime) {
            alert(`Você tem um evento: ${event.description} às ${event.startTime}`);
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const isHoliday = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    return feriados.some(holiday => holiday.date === formattedDate);
  };

  const getHolidayName = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    const holiday = feriados.find(h => h.date === formattedDate);
    return holiday ? holiday.name : null;
  };

  return (
    <div className="calendario-container">
      <h2>Calendar - Brasilia Timezone</h2>
      <p>Current time: {brTimeZone}</p>

      <div className="calendario-layout">
        <div className="calendar">
          <Calendar 
            onChange={setSelectedDate} 
            value={selectedDate} 
            locale="en-US" 
            nextLabel="Next"
            prevLabel="Previous"
            tileClassName={({ date, view }) => {
              if (isHoliday(date)) {
                return 'holiday';
              }
              if (view === 'month' && date.getMonth() !== selectedDate.getMonth()) {
                return 'neighboringMonth';
              }
            }}
          />
        </div>

        <div className="event-meeting-container">
          <div className="selected-date">
            <h3>Selected Day: {selectedDate.toDateString()}</h3>

            {isHoliday(selectedDate) && (
              <p><strong>Feriado: {getHolidayName(selectedDate)}</strong></p>
            )}

            <input 
              type="text" 
              placeholder="Event Description" 
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
            />
            <input 
              type="time" 
              placeholder="Event Start Time" 
              value={eventStartTime}
              onChange={(e) => setEventStartTime(e.target.value)}
            />
            <input 
              type="time" 
              placeholder="Event End Time" 
              value={eventEndTime}
              onChange={(e) => setEventEndTime(e.target.value)}
            />
            <button onClick={handleAddEvent}>Add Event</button>

            <h3>Enter a Meeting:</h3>
            <input 
              type="text" 
              placeholder="Enter Meeting Link" 
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
            />
            <button onClick={handleAddMeeting}>Join Meeting</button>
          </div>

          <div className="event-list">
            <h3>Events on {selectedDate.toDateString()}:</h3>
            <ul>
              {(events[selectedDate.toDateString()] || []).map((event, index) => (
                <li key={index}>{event.description} from {event.startTime} to {event.endTime}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendario;
