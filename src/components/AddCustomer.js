import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import firebase from './../firebase.js';

export default function FormDialog() {
  // Keep the value of the TextField
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // For validate
  const [emailExist, setEmailExist] = useState(false);
  const [wrongEmail, setwrongEmail] = useState(false);
  const [wrongPhone, setwrongPhone] = useState(false);

  // To open the dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // To enable/disable the submit button
  function validateForm() {
    return !wrongPhone && !wrongEmail && !emailExist && email.length > 0 && phoneNumber.length > 0 && name.length > 0;
  }
  
  // By pressing the Submit button
  const handleSubmit = (event) => {
    event.preventDefault();

    var flagExist = false
    var flagEmail = false
    var flagPhone = false
    var db = firebase.firestore();

    // Checks if customer email exist
    db.collection("customers")
    .where("email", "==", email)
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {
          if(doc.exists){
            if(!doc.data().deleted){//??????????????????????
              console.log("222222222222222222")
              flagExist = true
              setEmailExist(true)
            }   
          }
      });
    }).catch((error) => {
        console.log("Error getting document:", error);
    }).then(() => {
      //Input integrity check - phone number
      if(!(/[0-9]{2,3}-[0-9]{7}/.test(phoneNumber))){
        setwrongPhone(true)
        flagPhone = true
      }
      //Input integrity check - email address
      if(!(/@/.test(email))){
        setwrongEmail(true)
        flagEmail = true
      }

      // All the field currect => close form
      if(!flagExist && !flagEmail && !flagPhone){
        setOpen(false);
        // Enter to firestore customer details
        db.collection("customers").doc().set({
          name: name,
          phoneNumber: phoneNumber,
          email: email,
          deleted: false,
        }).then(() => {
          // After the entry refreshes the page
          window.location.reload();
        })
        setName('');
        setPhoneNumber('');
        setEmail('');
      };  
    });
  }

  // By pressing the Cancel button
  const handleCancel = () => {
    // Initializing the values
    setOpen(false);
    setName('');
    setPhoneNumber('');
    setEmail('');
    setwrongEmail(false)
    setwrongPhone(false)
    setEmailExist(false)
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Customer Details</DialogTitle>
        <DialogContent>
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
            error={wrongPhone}
            helperText={wrongPhone ? 'Please match the requested format' : ''}
            type="tel"
            placeholder="Format: 123-4567890 / 12-3456789"
            margin="dense"
            id="name"
            label="Phone Number"
            fullWidth
            onChange={(event) => {
              setPhoneNumber(event.target.value)
              setwrongPhone(false)
            }}
          />
          <TextField
            error={wrongEmail || emailExist}
            helperText={wrongEmail ? 'Please include an @ in the email address' : emailExist? 'Customer exist':''}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            placeholder="Please include an '@' in the email address"
            fullWidth
            onChange={(event) => {
              setEmail(event.target.value) 
              setEmailExist(false)
              setwrongEmail(false)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}  color="primary" disabled={!validateForm()}>Submit</Button>
          <Button onClick={handleCancel} color="primary">Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}