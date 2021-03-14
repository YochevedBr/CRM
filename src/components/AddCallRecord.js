import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase from './../firebase.js';

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  // Customer ID
  const [customerId,] = useState(props.dataFromParentId);
  const [agentId,] = useState(localStorage.getItem("agent_id"));

  // Current Date
  const [currentDate,] = useState(new Date())

  // Keep the value of the TextField
  const [interest, setInterest] = useState('');
  const [purchased, setPurchased] = useState([0]);
  const [support, setSupport] = useState('');

  // Handle on click button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Validate form
  const [PurchaseNotExist, setPurchaseNotExist] = useState(false);
  const [PurchaseSold, setPurchaseSold] = useState(false);

  // For Switch
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked(prev => !prev);
  };
  
  const handleCancel = (event) => {
    event.preventDefault();
    setOpen(false);
    setPurchaseNotExist(false)
    setPurchaseSold(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    let formatDate = currentDate.getFullYear() + '/' + ""+(Number(currentDate.getMonth())+1) + '/' + currentDate.getDate()
    var db = firebase.firestore();
    
    // Check if the apartments exist
    var flag = false
    var reloadFlag = false
    var count = 0

    // Checks if the customer did not purchase anything
    
    if (!purchased[0]) {
      setOpen(false);

      // Create call_records Collection
      db.collection("call_records").doc().set({
        agent_id: agentId,
        customer_id: customerId,
        date: formatDate,
        interested: interest,
        purchased: [],
        support: support,
        return: checked
      }).then(() => {
        window.location.reload();
      })
      setInterest('');
      setPurchased([0])
      setSupport('');
      setChecked(false)
    }
    else{  
      for(var i=0; i<purchased.length; i++){
        db.collection("products")
        .doc(purchased[i])
        .get()
        .then((doc) => {
          count ++
          // if apartment doesn't exist, 
          if (!doc.exists){ 
            setPurchaseNotExist(true)
            setPurchaseSold(false)
            setPurchased([0])
            flag = true
          }
          
          else{
            //if apartment is sold out
            if (doc.data().sold){
              setPurchaseSold(true)
              setPurchaseNotExist(false)
              setPurchased([0])
              flag = true
            }

            // Checks if all the apartments exist => close dialog
            if(count == purchased.length && !flag){
              for(var i=0; i<purchased.length; i++){
                db.collection("products")
                .doc(purchased[i])
                .update({
                  sold: 'Yes'
                })
              }
              setOpen(false);

              // Create call_record Collection
              db.collection("call_records").doc().set({
                agent_id: agentId,
                customer_id: customerId,
                date: formatDate,
                interested: interest,
                purchased: purchased,
                support: support,
                return: checked
              })
              reloadFlag = true // need to reload the page
              setInterest('');
              setPurchased([0])
              setSupport('');
              setChecked(false)
              setPurchaseNotExist(false)
              setPurchaseSold(false)
            }
          }
        }).then(() => {
          if(reloadFlag){
            window.location.reload();
          }
        });
      } 
    }
  };

  function validateForm() {
    return !PurchaseNotExist && !PurchaseSold && /\s/.test(purchased) == false && interest != '';
  }

  function handleChange() {
    setPurchaseNotExist(false)
    setPurchaseSold(false)
  }
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add Call Record</Button>
      <Dialog open={open} onClose={handleCancel} onChange={handleChange} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Call Record Details</DialogTitle>
        <DialogContent>            
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Interested in ..."
                helperText="Required field *"
                type="text"
                fullWidth
                onChange={(event) => setInterest(event.target.value)}
            />
            <TextField
                margin="dense"
                id="name"
                label="Products purchased"
                error={PurchaseNotExist || PurchaseSold}
                helperText={PurchaseNotExist ? 'The purchase entered doesn’t match any apartment id.' : PurchaseSold? 'The purchase entered is sold out.':'Write each purchase in a new line'}
                type="text"
                fullWidth
                multiline
                onChange={(event) => {
                    var res = event.target.value
                    res = res.split("\n")
                    setPurchased(res)
                    setPurchaseNotExist(false)
                    setPurchaseSold(false)
                  }
                }
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
                <FormControlLabel control={<Switch checked={checked} onChange={toggleChecked} />} label="YES" />
            </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" disabled={!validateForm()}>
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