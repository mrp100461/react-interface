import React from 'react';

const SearchAppointments = ({ orderBy, orderDir, changeOrder, searchApts }) => (
  <div className='search-appointments row justify-content-center my-4'>
    <div className='col-md-6'>
      <div className='input-group'>
        <input
          id='SearchApts'
          type='text'
          className='form-control'
          aria-label='Search Appointments'
          onChange={(e) => searchApts(e.target.value)}
        />
        <div className='input-group-append'>
          <button
            type='button'
            className='btn btn-primary dropdown-toggle'
            data-toggle='dropdown'
            aria-haspopup='true'
            aria-expanded='false'
          >
            Sort by: <span className='caret' />
          </button>

          <div className='sort-menu dropdown-menu dropdown-menu-right'>
            <button
              className={
                orderBy === 'petName'
                  ? 'sort-by dropdown-item active'
                  : 'sort-by dropdown-item'
              }
              onClick={(e) => changeOrder('petName', orderDir)}
              href='#'
            >
              Pet Name
            </button>
            <button
              className={
                orderBy === 'aptDate'
                  ? 'sort-by dropdown-item active'
                  : 'sort-by dropdown-item'
              }
              onClick={(e) => changeOrder('aptDate', orderDir)}
              href='#'
            >
              Date
            </button>
            <button
              className={
                orderBy === 'ownerName'
                  ? 'sort-by dropdown-item active'
                  : 'sort-by dropdown-item'
              }
              onClick={(e) => changeOrder('ownerName', orderDir)}
              href='#'
            >
              Owner
            </button>
            <div role='separator' className='dropdown-divider' />
            <button
              className={
                'sort-by dropdown-item ' +
                (orderDir === 'asc'
                  ? 'sort-by dropdown-item active'
                  : 'sort-by dropdown-item')
              }
              onClick={(e) => changeOrder(orderBy, 'asc')}
              href='#'
            >
              Asc
            </button>
            <button
              className={
                'sort-by dropdown-item ' +
                (orderDir === 'desc'
                  ? 'sort-by dropdown-item active'
                  : 'sort-by dropdown-item')
              }
              onClick={(e) => changeOrder(orderBy, 'desc')}
              href='#'
            >
              Desc
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SearchAppointments;
