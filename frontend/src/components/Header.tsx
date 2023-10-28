import { AppBar, Toolbar } from '@mui/material'
import React from 'react'
import Logo from './shared/Logo'
import NavLink from './shared/NavLink';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar sx={{ bgcolor:"transparent", position: "static", boxShadow:"none"}}>
      <Toolbar sx={{display: "flex"}}>
        <Logo></Logo>
        <div>
          {auth?.isLoggedIn ? (
            <>
              <NavLink 
                bg={"#00fffc"} 
                to="/login"
                text="Go To Chat"
                textColor="black"
              />
              <NavLink 
                bg={"#51538f"} 
                to="/signup"
                text="Sign Up"
                textColor="white"
              />
            </>
              ):(
                <>
                <NavLink 
                  bg={"#00fffc"} 
                  to="/chat"
                  text="Go To Chat"
                  textColor="black"
                />
                <NavLink 
                  bg={"#51538f"} 
                  to="/login"
                  text="Login"
                  textColor="white"
                  onClick={auth.login}
                />
              </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header