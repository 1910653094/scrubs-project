import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import '../DashboardComponents/ScrubActions.scss';
import { useState, useCallback } from 'react';
import DateSelect from '../Inputs/DateSelect';
import { CustomButton } from '..';

const scrubTypes = [
  {
    value: 'Labcoat',
    label: 'Labcoat',
  },
  {
    value: 'Scrub Top',
    label: 'Scrub Top',
  },
  {
    value: 'Scrub Bottom',
    label: 'Scrub Bottom',
  }
];

const sizes = [
  {
    value: 'XS',
    label: 'XS',
  },
  {
    value: 'S',
    label: 'S',
  },
  {
    value: 'M',
    label: 'M',
  },
  {
    value: 'L',
    label: 'L',
  },
  {
    value: 'XL',
    label: 'XL',
  }
];

const colors = [
  {
    value: 'white',
    label: 'white',
  },
  {
    value: 'lilac',
    label: 'lilac',
  },
  {
    value: 'blue',
    label: 'blue',
  },
  {
    value: 'green',
    label: 'green',
  },
  {
    value: 'grey',
    label: 'grey',
  }
];

const professions = [
  {
    value: 'Medical Staff Member',
    label: 'MSM',
  },
  {
    value: 'Housekeeping Staff Member',
    label: 'HSM',
  }
];

const genders = [
  {
    value: 'female',
    label: 'female',
  },
  {
    value: 'male',
    label: 'male',
  }
];

function ScrubsToStaffMember() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [gender, setgender] = useState("");
  const [scrubType, setScrubType] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [amount, setAmount] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddItems = () => {
    //TODO
    setScrubType('');
    setSize('');
    setColor('');
    setAmount('');
    setReturnDate('');
  };

  const handleGive = useCallback(() => {

    if (email === '' || name === '' || profession === '' || gender === '' || scrubType === '' || size === '' || color === ''
      || amount === '' || returnDate === '') {
      console.log("you must fill all the fields");
      //TODO Do we have a component to display that?
    } else {
      setOpen(false);

      console.log(email);
      console.log(name);
      console.log(profession);
      console.log(gender);
      console.log(scrubType);
      console.log(size);
      console.log(color);
      console.log(amount);
      console.log(returnDate);

      // TODO CALL API 

      // RESET VALUE
      setEmail('');
      setName('');
      setProfession('');
      setgender('');
      setScrubType('');
      setSize('');
      setColor('');
      setAmount('');
      setReturnDate('');

    }
  }, [email, name, profession, gender, scrubType, size, color, amount, returnDate])

  return (
    <div>
      <button id='s-c-blue' className='scrub-actions-box' onClick={handleClickOpen}>Give to Scrub Member</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Give scrubs</DialogTitle>
        <DialogContent>
          <Box
            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Start typing their email" variant="outlined" style={{ width: '97%' }} value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            <TextField id="outlined-basic" label="Enter their name" variant="outlined" style={{ width: '40%' }} value={name} onChange={(e) => { setName(e.target.value) }} />
            <TextField
              id="outlined-select-profession"
              select
              label="Select Profession"
              style={{ width: '13ch' }} value={profession} onChange={(e) => { setProfession(e.target.value) }}
            >
              {professions.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-genders"
              select
              label="Select Gender"
              style={{ width: '13ch' }} value={gender} onChange={(e) => { setgender(e.target.value) }}
            >
              {genders.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            <TextField
              id="outlined-select-types"
              select
              label="Select Type"
              style={{ width: '13ch' }} value={scrubType} onChange={(e) => { setScrubType(e.target.value) }}
            >
              {scrubTypes.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-sizes"
              select
              label="Select Size"
              style={{ width: '13ch' }} value={size} onChange={(e) => { setSize(e.target.value) }}
            >
              {sizes.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-colors"
              select
              label="Select Color"
              style={{ width: '13ch' }} value={color} onChange={(e) => { setColor(e.target.value) }}
            >
              {colors.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
            <TextField id="outlined-basic" label="Amount" variant="outlined" style={{ width: '14ch' }} value={amount} onChange={(e) => { setAmount(e.target.value) }} />
            //<DateSelect value={returnDate} onChange={(e) => { setReturnDate(e.target.value) }} /> TODO
            <CustomButton text="ADD NEW ITEMS" type="primary" fontSize="12px" onClick={handleAddItems} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleGive} variant="outlined">GIVE SCRUBS</Button>
        </DialogActions>
      </Dialog>
    </div>
  )

}

export default ScrubsToStaffMember