import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core';

function Header() {
   return (
      <AppBar position='static'>
         <Toolbar>
            <h1>My App</h1>
         </Toolbar>
      </AppBar>
   );
}

export default Header;
