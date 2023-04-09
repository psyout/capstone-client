import React from 'react';
import './SortDropDown.scss';
import { Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';

function SortDropDown({ options, value, onChange }) {
   return (
      <div className='sort-container'>
         <FormControl fullWidth={true} margin='normal'>
            <InputLabel style={{ color: '#278C8C', fontFamily: 'Rubik', fontWeight: '500' }}>Sort By:</InputLabel>
            <Select
               value={value}
               onChange={onChange}
               style={{
                  color: '#2b2840',
                  fontFamily: 'Rubik',
                  fontWeight: '500',
                  padding: '0.2rem 0',
                  borderRadius: '0.5rem',
               }}>
               {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                     {option.label}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   );
}

export default SortDropDown;
