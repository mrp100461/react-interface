import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const AddAppointments = ({ formDisplay, toggleForm, addAppointment }) => {
  const [app, setApp] = useState({
    petName: '',
    ownerName: '',
    aptDate: '',
    aptTime: '',
    aptNotes: '',
  });

  const handleAdd = (e) => {
    e.preventDefault();
    let tempApt = app;
    tempApt.aptDate = app.aptDate + ' ' + app.aptTime;
    delete tempApt.aptTime;
    addAppointment(tempApt);

    setApp({
      petName: '',
      ownerName: '',
      aptDate: '',
      aptTime: '',
      aptNotes: '',
    });
    toggleForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApp((prevApp) => ({
      ...prevApp,
      [name]: value,
    }));
  };

  return (
    <div
      className={
        formDisplay
          ? 'card textcenter mt-3'
          : 'card textcenter mt-3 add-appointment'
      }
    >
      <div
        className='apt-addheading card-header bg-primary text-white'
        onClick={toggleForm}
      >
        <FaPlus /> Add Appointment
      </div>

      <div className='card-body'>
        <form id='aptForm' noValidate onSubmit={handleAdd}>
          <div className='form-group form-row'>
            <label
              className='col-md-2 col-form-label text-md-right'
              htmlFor='petName'
              readOnly
            >
              Pet Name
            </label>
            <div className='col-md-10'>
              <input
                type='text'
                className='form-control'
                name='petName'
                placeholder="Pet's Name"
                value={app.petName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-group form-row'>
            <label
              className='col-md-2 col-form-label text-md-right'
              htmlFor='ownerName'
            >
              Pet Owner
            </label>
            <div className='col-md-10'>
              <input
                type='text'
                className='form-control'
                name='ownerName'
                placeholder="Owner's Name"
                value={app.ownerName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-group form-row'>
            <label
              className='col-md-2 col-form-label text-md-right'
              htmlFor='aptDate'
            >
              Date
            </label>
            <div className='col-md-4'>
              <input
                type='date'
                className='form-control'
                name='aptDate'
                id='aptDate'
                value={app.aptDate}
                onChange={handleChange}
              />
            </div>
            <label
              className='col-md-2 col-form-label text-md-right'
              htmlFor='aptTime'
            >
              Time
            </label>
            <div className='col-md-4'>
              <input
                type='time'
                className='form-control'
                name='aptTime'
                id='aptTime'
                value={app.aptTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-group form-row'>
            <label className='col-md-2 text-md-right' htmlFor='aptNotes'>
              Apt. Notes
            </label>
            <div className='col-md-10'>
              <textarea
                className='form-control'
                rows='4'
                cols='50'
                name='aptNotes'
                id='aptNotes'
                placeholder='Appointment Notes'
                value={app.aptNotes}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='form-group form-row mb-0'>
            <div className='offset-md-2 col-md-10'>
              <button type='submit' className='btn btn-primary d-block ml-auto'>
                Add Appointment
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointments;
