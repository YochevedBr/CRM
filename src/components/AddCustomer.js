import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from './../firebase.js';


export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  // Keep the value of the TextField
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  function validateForm() {
    return email.length > 0 && phoneNumber.length > 0 && name.length > 0;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setOpen(false);

    var db = firebase.firestore();
    db.collection("customers").doc().set({
      name: name,
      phoneNumber: phoneNumber,
      email: email,
      deleted: false,
    }).then(() => {
      window.location.reload();
    })
      
    setName('');
    setPhoneNumber('');
    setEmail('');
  };

  const handleCancel = () => {
    setOpen(false);
    console.log(name);
    console.log(phoneNumber);
    console.log(email);
    setName('');
    setPhoneNumber('');
    setEmail('');
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleSubmit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Customer Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a custmer to customers table press submits, please enter the email address here
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            type="text"
            fullWidth
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Phone Number"
            type="phone"
            fullWidth
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
          <TextField
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            onChange={(event) => setEmail(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}  color="primary" disabled={!validateForm()}>
            Submit
          </Button>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

