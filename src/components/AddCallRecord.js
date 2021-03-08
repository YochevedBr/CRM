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
  const [agentId, setAgentId] = useState(localStorage.getItem("agent_id"));

  // Current Date
  const [currentDate, setCurrentDate] = useState(new Date())

  // Keep the value of the TextField
  const [interest, setInterest] = useState('');
  const [purchased, setPurchased] = useState([]);
  const [support, setSupport] = useState('');

  // Handle on click button
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Validate form
  const [PurchaseNotExist, setPurchaseNotExist] = useState(false);
  const [PurchaseSold, setPurchaseSold] = useState(false);

  
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
    var count = 0

    if(purchased.length == 0){
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
      
      setInterest('');
      setPurchased([]);
      setSupport('');
      setChecked(false)
    }

    for(var i=0; i<purchased.length; i++){
      db.collection("products")
      .doc(purchased[i])
      .get()
      .then((doc) => {
        // if apartment doesn't exist, 
        count ++
        if (!doc.exists){ 
          setPurchaseNotExist(true)
          setPurchaseSold(false)
          flag = true
        }
        
        else{

          //if apartment is sold out
          if (doc.data().sold){
            setPurchaseSold(true)
            setPurchaseNotExist(false)
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
            
            setInterest('');
            setPurchased([]);
            setSupport('');
            setChecked(false)
            setPurchaseNotExist(false)
            setPurchaseSold(false)
          }
        }
      });
    } 
  };

  function validateForm() {
    // return interest.length > 0 && /\s/.test(purchased) == false;
    return !PurchaseNotExist && /\s/.test(purchased) == false;
    // return (!PurchaseNotExist && /\s/.test(purchased) == false) || (!PurchaseSold && /\s/.test(purchased) == false);
  }
  function handleChange(event) {
    setPurchaseNotExist(false)
    setPurchaseSold(false)
  }

  // For Switch
  const [checked, setChecked] = React.useState(false);

  const toggleChecked = () => {
    setChecked(prev => !prev);
  };
  
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>Add Call Record</Button>
      <Dialog open={open} onClose={handleSubmit} onChange={handleChange} aria-labelledby="form-dialog-title">
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
                label="Products purchased (write each purchase in a new line)"
                primary="Photos" 
                secondary="Jan 9, 2014"
                type="text"
                fullWidth
                multiline
                onChange={(event) => {
                  var res = event.target.value
                  res = res.split("\n")
                  setPurchased(res)}
                }
            />
            {/* In case of wrong not responsive  !!!!!!!!!!!!!!!! */}
            <h6 style={{display: PurchaseNotExist ? 'block' : 'none', color: 'red', width: '500px'}}>The purchase entered doesn’t match any apartment id.</h6>
            <h6 style={{display: PurchaseSold ? 'block' : 'none', color: 'red', width: '500px'}}>The purchase entered is sold out.</h6>


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

