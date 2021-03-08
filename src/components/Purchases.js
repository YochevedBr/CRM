import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router";
import { useState, useEffect } from "react";




export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());

  const history = useHistory();

  const handleDateChange = (date) => {
    console.log("on change")
    setSelectedDate(date);
    let formatDate = date.getFullYear() + '/' + ""+(Number(date.getMonth())+1) + '/' + date.getDate()
    setDate(formatDate);
    console.log("formatDate: " + formatDate)
    console.log("Date:" + date)
    };

    useEffect(() => {
      setDate(date.getFullYear() + '/' + ""+(Number(date.getMonth())+1) + '/' + date.getDate())
      console.log("use effect")
    },[]);



  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
        //   format="MM/dd/yyyy"
          format="yyyy/dd/MM"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Select a purchase date"
          format="yyyy/dd/MM"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </Grid>
      <Button variant="outlined" color="primary" 
        onClick={() => {
            history.push({pathname: "/print_purchases/" + date})}}>Search</Button>{' '}
                    
    </MuiPickersUtilsProvider>
    
  );
}






