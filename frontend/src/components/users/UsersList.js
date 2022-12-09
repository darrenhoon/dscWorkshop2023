import React from 'react';
import { Button, TextField, Box, Grid, Card} from '@mui/material';
import UserCard from './UserCard';
import './UsersList.css';

const UsersList = props => {

  return (
    <ul className='users-list'>

    <Box textAlign='center'>
      <Grid container direction={"column"} spacing={5}>
      {props.items.map(user => (
        <Grid item>
          <UserCard
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            password={user.password}
          />
        </Grid>
      ))}
      </Grid>
    </Box>
    </ul>
  );
};

export default UsersList;
