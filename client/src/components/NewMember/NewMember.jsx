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
import { CustomButton } from '..';
import { useState } from 'react';

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



const NewMember = () => {
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [professionValue, setProfessionValue] = useState("");
  const [genderValue, setGenderValue] = useState("");

  //Popover
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRegister = () => {
    setOpen(false);

    console.log(emailValue);
    console.log(nameValue);
    console.log(professionValue);
    console.log(genderValue);

    // TODO : CALL API & "regex"




    // RESET VALUE
    setEmailValue('');
    setNameValue('');
    setProfessionValue('');
    setGenderValue('');
  }

  const handleEmailChange = e => {
    setEmailValue(e.target.value);
  };

  const handleNameChange = e => {
    setNameValue(e.target.value);
  };

  const handleProfessionChange = e => {
    setProfessionValue(e.target.value);
  };

  const handleGenderChange = e => {
    setGenderValue(e.target.value);
  };


  return (
    <div>
      <CustomButton
        text="REGISTER NEW MEMBER"
        type="primary"
        fontSize="16px"
        onClick={handleClickOpen}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Register new staff member</DialogTitle>
        <DialogContent>
          <Box
            component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }}
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Enter their email" variant="outlined" style={{ width: '97%' }} value={emailValue} onChange={handleEmailChange} />
            <Divider style={{ marginTop: 15, marginBottom: 15 }} />
            <TextField id="outlined-basic" label="Enter their name" variant="outlined" style={{ width: '40%' }} value={nameValue} onChange={handleNameChange} />

            <TextField
              id="outlined-select-type"
              select
              label="Select Profession"
              style={{ width: '13ch' }} value={professionValue} onChange={handleProfessionChange}
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
              style={{ width: '13ch' }} value={genderValue} onChange={handleGenderChange}
            >
              {genders.map((element) => (
                <MenuItem key={element.label} value={element.value}>
                  {element.value}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleRegister} variant="outlined">REGISTER</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default NewMember