import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase from './../firebase.js';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  // Customer ID
  const [customerId, setCustomerId] = useState(props.dataFromParent);
  console.log("data: "+props.dataFromParent)

  // Current Date
  const [currentDate, setCurrentDate] = useState(new Date())

  // Keep the value of the TextField
  const [interest, setInterest] = useState('');
  const [purchased, setPurchased] = useState('');
  const [support, setSupport] = useState('');

  // Handle on click button
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = (event) => {
    event.preventDefault();

    setOpen(false);

    console.log(interest);
    console.log(purchased);
    console.log(support);
    console.log(checked)
    console.log('currentDate: ' + currentDate)
    let formatDate = currentDate.getDate() + '/' + currentDate.getMonth()+1 + '/' + currentDate.getFullYear()
    console.log(formatDate)

    const callRecordsRef = firebase.database().ref('call_records');
    const call_record = {
      customer_id: customerId,
      date: formatDate,
      interest: interest,
      purchased: purchased,
      support: support,
      return: checked
    }

    callRecordsRef.push(call_record);
    setInterest('');
    setPurchased('');
    setSupport('');
    setChecked(false)
  };

  // For Switch
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked(prev => !prev);
  };
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add Call Record</Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Call Record Details</DialogTitle>
        <DialogContent>            
            {/* <TextareaAutosize
                autoFocus
                rowsMax	= "2"
                rowsMin = "2"
                margin="dense"
                id="name"
                label="Interested in ..."
                type="text"
                required
                fullWidth>
            </TextareaAutosize> */}
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Interested in ..."
                type="text"
                fullWidth
                onChange={(event) => setInterest(event.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Products purchased"
                type="text"
                fullWidth
                multiline
                onChange={(event) => setPurchased(event.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                onChange={event => setSupport(event.target.value)}
                label="Support"
                type="phone"
                fullWidth
            />
            <br></br>
            <br></br>
            <DialogContentText>Do return to customer?</DialogContentText>
            <FormGroup>
                {/* <FormControlLabel control={<Switch size="small" checked={checked} onChange={toggleChecked} />} label="Small" /> */}
                <FormControlLabel control={<Switch checked={checked} onChange={toggleChecked} />} label="YES" />
            </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

