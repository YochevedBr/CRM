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
  const [customerId, setCustomerId] = useState(props.dataFromParentId);
  const [customerName, setCustomerName] = useState(props.dataFromParentName);
  console.log("Customer Name: " + customerName)
  const [agentId, setAgentId] = useState('');

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
    let formatDate = currentDate.getDate() + '/' + ""+(Number(currentDate.getMonth())+1) + '/' + currentDate.getFullYear()

    // Create call_record Collection
    var db = firebase.firestore();
    db.collection("call_records").doc().set({
      agent_id: agentId,
      customer_id: customerId,
      customer_name: customerName,
      date: formatDate,
      interested: interest,
      purchased: purchased,
      support: support,
      return: checked
    })
    
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

