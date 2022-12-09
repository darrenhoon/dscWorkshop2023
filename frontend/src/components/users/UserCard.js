import React, { useState } from 'react';
import { Card, Box, Grid} from '@mui/material';
import './UserCard.css';

const UserCard = props => {

  return (
    <React.Fragment>
      <li className="user-card">
        <Card>
          <div className="user-card__info">
            <p>Name: <b>{props.name}</b></p>
            <p>Email: <b>{props.email}</b></p>
            <p>Password: <b>{props.password}</b></p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default UserCard;
