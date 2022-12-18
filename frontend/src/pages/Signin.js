import React, { useCallback, useReducer, useState } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';

import './Form.css';
import {apis} from '../apis/apis.js';
import { config } from '../configs.js'

const jwt = require('jsonwebtoken');
const JWT_KEY = config.JWT_KEY

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
  const handleResponseMessage = msg => {
    setRequestResponse(msg)
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(`Sending email: ${newUserEmail}, password: ${newUserPassword}`)

    apis.submitLogin(newUserEmail, newUserPassword)
      .then(res => {
        console.log("Submit Signin result:")
        if (res["response"]) { // this part are for failed requests, such as no account or wrong password
          let msg = res.response.data.message
          handleResponseMessage(msg)
        } else { // this part are for successful requests
          console.log("Inside res[\"data\"] part")
          let decryptedToken

          try {
            decryptedToken = jwt.verify(res["data"]["token"], JWT_KEY)
            
            console.log("inside the SUCCESS response part!")
            console.log("Data:")
            console.log(res.data)

            console.log("Token:")
            console.log(res.data.token)


            console.log("Decrypted Token:")
            console.log(decryptedToken)

            handleResponseMessage(res.data.message)
          } catch {
            console.log("inside the FAIL jwt decrpytion part!")
            console.log(res.data)
            handleResponseMessage(res.data.message)  
          }

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