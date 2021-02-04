import React, { useState, useEffect } from 'react';
import '../css/App.css';

import AddAppointment from './AddAppointment';
import SearchAppointments from './SearchAppointments';
import ListAppointments from './ListAppointments';

import { findIndex, without } from 'lodash';
import { data } from 'jquery';

const App = () => {
  const [appointments, setAppointments] = useState([]);
  const [formDisplay, setFormDisplay] = useState(false);
  const [orderBy, setOrderBy] = useState('petName');
  const [orderDir, setOrderDir] = useState('asc');
  const [queryText, setQueryText] = useState('');

  const [lastIndex, setLastIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleForm = () => {
    setFormDisplay(!formDisplay);
  };

  const searchApts = (query) => {
    setQueryText(query);
  };

  const changeOrder = (order, dir) => {
    setOrderBy(order);
    setOrderDir(dir);
  };

  const updateInfo = (name, value, id) => {
    let tempApts = appointments;
    let aptIndex = findIndex(appointments, {
      aptId: id,
    });
    tempApts[aptIndex][name] = value;
    setAppointments(tempApts);
  };

  const addAppointment = (apt) => {
    let tempApts = appointments;
    apt.aptId = lastIndex;
    tempApts.unshift(apt);
    setAppointments(tempApts);
    setLastIndex(lastIndex + 1);
  };

  const deleteAppointment = (apt) => {
    let tempApts = appointments;
    tempApts = without(tempApts, apt);
    setAppointments(tempApts);
  };

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch('./data.json');
        const result = await response.json();
        const apps = result.map((item, id) => {
          item.aptId = id;
          setLastIndex(item.aptId + 1);
          return item;
        });
        setLoading(true);
        setAppointments(apps);
        return setLoading(false);
      } catch (value_3) {
        return setError(value_3);
      }
    };
    getAppointments();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <pre>{JSON.stringify(error, null, 2)}</pre>;
  }
  if (!data || data.length === 0) return null;

  let filteredApts = appointments;
  let order = orderDir === 'asc' ? 1 : -1;

  filteredApts = filteredApts
    .sort((a, b) => {
      return a[orderBy].toLowerCase() < b[orderBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    })
    .filter((eachItem) => {
      return (
        eachItem['petName'].toLowerCase().includes(queryText.toLowerCase()) ||
        eachItem['ownerName'].toLowerCase().includes(queryText.toLowerCase()) ||
        eachItem['aptNotes'].toLowerCase().includes(queryText.toLowerCase())
      );
    });

  return (
    <main className='page bg-white' id='petratings'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 bg-white'>
            <div className='container'>
              <AddAppointment
                formDisplay={formDisplay}
                toggleForm={toggleForm}
                addAppointment={addAppointment}
              />
              <SearchAppointments
                orderBy={orderBy}
                orderDir={orderDir}
                changeOrder={changeOrder}
                searchApts={searchApts}
              />
              <ListAppointments
                appointments={filteredApts}
                deleteAppointment={deleteAppointment}
                updateInfo={updateInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;
