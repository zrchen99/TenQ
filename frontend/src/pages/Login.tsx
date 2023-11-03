import { Box, Typography } from '@mui/material'
import React from 'react'
import CustomInput from '../components/shared/CustomInput';

const Login = () => {
  return (
    <Box width={'100%'} height={'100%'} display={"flex"} flex={1}>
      <Box padding={8} mt={8} display={{md: "flex", sm:"none"}} >
        <img src="airobot.png" alt="Robot" style={{width:"400px"}}/>
      </Box>
      <Box display={'flex'} flex={{ xs: 1, md: 0.5 }} justifyContent={'center'} alignItems={"center"}>
        <form style={{margin: 'auto', padding: '30px', boxShadow: "10px 10px 20px #000", border:"none"}}>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center',}}>
            <Typography variant="h4" textAlign="center" padding={2} fontWeight={600} gutterBottom>
              Login
            </Typography>
            <CustomInput type="email" name="email" label="Email" />
            <CustomInput type="password" name="password" label="Password" />
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default Login