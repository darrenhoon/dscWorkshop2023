# User Service API Documentation
## Route: `/api/users`

### GET `/getUsers`:
Retrieves all users in database
#### Status codes:
- `200`: Successfully retrieved all users in database
- `503`: Server/Network error

### POST `/signup`:
#### Body Parameters:
- `name`: Name of user signing up
- `email`: Email of user signing up
- `password`: Password of user signing up
#### Status codes:
- `201`: New user has successfully signed up
- `409`: Email or Name already exists in database
- `503`: Error creating JWT Token

### GET `/login`:
#### Body Parameters:
- `email`: Email of user logging in
- `password`: Password of user logging in
#### Status codes:
- `200`: User has successfully logged in
- `400`: Body parameters not specified correctly
- `401`: No such account
- `403`: Wrong password
- `503`: Server error / Network error / Error hashing the password / Error verifying JWT Token

### PUT `/updatePassword`:
#### Body Parameters:
- `email`: Email of user requesting to change password
- `password`: Current password the user has
- `new_password`: Updated password of the user
#### Status codes:
- `201`: User has successfully been deleted from database
- `400`: Invalid inputs sent
- `403`: Wrong current password and password of user account is not changed.
- `404`: User is not found in database
- `503`: Server error / Network error / Error hashing the password / Error creating JWT Token


### POST `/sendPasswordChange`:
#### Body Parameters:
- `email`: Email of user requesting to change password
#### Status codes:
- `200`: Email sent successfully
- `401`: User is not verified
- `404`: User is not found in database
- `503`: Server error / Network error / Error hashing the password / Error creating JWT Token

### POST `/resetPassword`:
#### Body Parameters:
- `token`: Verification token from email
- `password`: New password
#### Status codes:
- `200`: Password resetted successfully
- `404`: User or Token is not found in database
- `503`: Server error / Network error / Error hashing the password / Error creating JWT Token

### DELETE `/deleteUser`:
#### Body Parameters:
- `email`: Email of user to be deleted
- `password`: Password of user to be deleted
#### Status codes:
- `200`: Deleted user
- `201`: User has successfully been deleted from database
- `400`: Wrong old password. Account not deleted
- `404`: User to be deleted is not found in database
- `503`: Unable to delete user account. Service unavailable.

