import React, { useCallback, useReducer, useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';

import './Form.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../util/validators';
import {apis} from '../apis/apis.js';

const Signin = () => {
  const [validButton, setValidButton] = useState(false)

  const [newUserEmail, setNewUserEmail] = useState('')
  const handleUserEmailChange = event=>{
    setNewUserEmail(event.target.value)
    if(newUserPassword !== '' && newUserEmail !== ''){
      setValidButton(true)
    } else {
      setValidButton(false)
    }
  }

  const [newUserPassword, setNewUserPassword] = useState('')
  const handleUserPasswordChange = event => {
    setNewUserPassword(event.target.value)
    if(newUserPassword !== '' && newUserEmail !== ''){
      setValidButton(true)
    } else {
      setValidButton(false)
    }
  }


  const [requestResponse, setRequestResponse] = useState('')
  const handleRequestResponse = res => {
    console.log(res)
    setRequestResponse(res.message)
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(`Sending email: ${newUserEmail}, password: ${newUserPassword}`)

    apis.submitLogin(newUserEmail, newUserPassword)
      .then(res => {
        console.log("Submit Signin result:")
        if (res["response"]) {
          // to know exactly what the res.xxx is, try doing console.log(res) and view the structure of the object in the browser console
          handleRequestResponse(res["response"]["data"])
        } else {
          handleRequestResponse(res["data"])
        }
      })
  }

  return (
    <form className="place-form">
      
      
      <Box textAlign='center'>

        <Grid container direction={"column"} spacing={5}>
          <Grid item>
          <span><b>Enter your credentials below</b></span>
          </Grid>
          <Grid item>
            <TextField 
              id="outlined-basic" 
              variant="outlined"
              type="text"
              label="Email"
              errorText="Please enter your email."
              fullWidth="true"
              onChange={handleUserEmailChange}
            />
          </Grid>
          <Grid item>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              type="password"
              label="Password"
              errorText="Please enter your password."
              fullWidth="true"
              onChange={handleUserPasswordChange}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit" disabled={!validButton} onClick={handleSubmit}>Login</Button>
          </Grid>
          {requestResponse ? 
          <Grid item>
            <span>{requestResponse}</span>
          </Grid> : <span></span>}
        </Grid>
      </Box>
    </form>
  );
};

export default Signin