import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import toast from 'react-hot-toast';

import { IoIosLogIn } from 'react-icons/io';
import CustomInput from '../components/shared/CustomInput';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const auth = useAuth();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    try {
      toast.loading("Signing in...", {id: "login" })
      await auth?.login(email, password);
      toast.success("Signed in!", {id: "login" })
    } catch (error) {
      toast.error("Error signing in", {id: "login" })
      console.log(error);
    }


  }
  return (
    <Box width={'100%'} height={'100%'} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{md: "flex", sm:"none", xs: "none"}} >
        <img src="airobot.png" alt="Robot" style={{width:"400px"}}/>
      </Box>
      <Box display={'flex'} flex={{ xs: 1, md: 0.5 }} justifyContent={"center"} alignItems={"center"}>
        <form onSubmit={handleSubmit} style={{margin: 'auto', padding: '30px', boxShadow: "10px 10px 20px #000", borderRadius: "10px", border:"none"}}>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600}>
              Login
            </Typography>
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />
            <Button type="submit" sx={{px:2, py:1, mt:2, width:"400px", borderRadius:2, bgcolor:"#00fffc", ":hover": {
              bgcolor: "white",
              color: "black"
            }}}
            endIcon={<IoIosLogIn />}> 
            Login </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login