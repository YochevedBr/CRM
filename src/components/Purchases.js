import React from 'react';
import { useHistory } from "react-router";
import { useEffect } from "react";
import 'date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// Component to select a date to purchases report
export default function MaterialUIPickers() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());

  const history = useHistory();

  // Handle with date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    let formatDate = date.getFullYear() + '/' + ""+(Number(date.getMonth())+1) + '/' + date.getDate()
    setDate(formatDate);
  };

  useEffect(() => {
    // Keeps the selected date
    setDate(date.getFullYear() + '/' + ""+(Number(date.getMonth())+1) + '/' + date.getDate())
  },[]);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
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
      <Button 
        variant="outlined" color="primary" 
        onClick={ () => {
          // Puts the selected date on the path url
          history.push({pathname: "/print_purchases/" + date})
          }
        }>
        Search
      </Button>{' '}             
    </MuiPickersUtilsProvider>
  );
}