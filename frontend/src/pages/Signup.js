import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Grid } from '@mui/material';
import jwt_decode from "jwt-decode";

import './Form.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../util/validators';
import {apis} from '../apis/apis.js';
import { config } from '../configs.js';

const Signup = () => {

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: config.OAUTH_GOOGLE_CLIENT_ID,
      callback: handleOauthCallback
    })

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline", size: "large"
    })
  }, [])



  const [validButton, setValidButton] = useState(false)

  const [newUserEmail, setNewUserEmail] = useState('')
  const handleUserEmailChange = event =>{
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
    setRequestResponse(res["message"])
  }

  function handleSubmit(event) {
    event.preventDefault();

    apis.submitSignup(newUserEmail, newUserPassword)
      .then(res => {
        console.log("Submit result:")
        console.log(res)
        if (res["response"]) {
          console.log(res["response"]["data"])
          handleRequestResponse(res["response"]["data"])
        } else {
          console.log(res["data"]["message"])
          handleRequestResponse(res["data"]["message"])
        }
        setNewUserEmail("")
        setNewUserPassword("")
      })
  }

  // if you want some global state, use redux.
  function handleOauthCallback(res) {
    console.log(`Entire response:\n`)
    console.log(res)
    console.log(`Encoded JWT Token:\n${res.credential}\n\n`)
    let userObj = jwt_decode(res.credential)
    console.log(`After decoding:`)
    console.log(userObj)
    if (userObj.email_verified) {
      setNewUserEmail(userObj.email)
    }
  }

  return (
    <form className="place-form">
      
      
      <Box textAlign='center'>

        <Grid container direction={"column"} spacing={5}>
          <Grid item>
          <span><b>Sign up</b></span>
          </Grid>
          <Grid item>
            <TextField 
              id="outlined-basic" 
              variant="outlined"
              type="text"
              label="Email"
              errorText="Please enter your email."
              fullWidth="true"
              value={newUserEmail}
              onChange={handleUserEmailChange}
            />
          </Grid>
          <Grid item>
            <TextField 
              id="outlined-basic" 
              variant="outlined" 
              // type="password"
              label="Password"
              errorText="Please enter your password."
              fullWidth="true"
              value={newUserPassword}
              onChange={handleUserPasswordChange}
            />
          </Grid>
          <Grid item>
            <Button variant="outlined" type="submit" disabled={!validButton} onClick={handleSubmit}>Signup</Button>
          </Grid>

          <Grid item>
            {/* <Button type="submit" onClick={handleOauth}>Get my info from Google OAuth2</Button> */}
            <div id="signInDiv"></div>
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

export default Signup