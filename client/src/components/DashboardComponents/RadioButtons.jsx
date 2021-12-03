/*import React from 'react';
import './RadioButtons.scss';
<<<<<<< HEAD

/*const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};*/
/*
const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
    };
};

const RadioButtons = ({ onValueChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onValueChange(newValue);
  };

  return (
    <Box sx={{ width: 'fit-content' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab className="tab" label="Overdue" {...a11yProps(0)} />
          <Tab className="tab" label="Borrowing" {...a11yProps(1)} />
          <Tab className="tab" label="Returned" {...a11yProps(2)} />
        </Tabs>
      </Box>
      {/*<TabPanel value={value} index={0}>
          {children}
      </TabPanel>
      <TabPanel value={value} index={1}>
          {children}
      </TabPanel>
      <TabPanel value={value} index={2}>
          {children}
      </TabPanel>*/
/*</Box>
);
};

export default RadioButtons;
=======

function a11yProps(index) {
return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
};
}

export default function RadioButtons({ returnValue }) {
const [value, setValue] = React.useState(0);

const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
        case 0:
            returnValue('overdue');
            break;
        case 1:
            returnValue('borrowing');
            break;
        case 2:
            returnValue('returned');
            break;

        default:
            break;
    }
};

return (
    <Box sx={{ width: 'fit-content' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label='basic tabs example'
            >
                <Tab className='tab' label='Overdue' {...a11yProps(0)} />
                <Tab className='tab' label='Borrowing' {...a11yProps(1)} />
                <Tab className='tab' label='Returned' {...a11yProps(2)} />
            </Tabs>
        </Box>
    </Box>
);
}
>>>>>>> 0f750d1623d3e3518f81623d7614516a2993fe48*/

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './RadioButtons.scss';

const a11yProps = index => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

export default function RadioButtons({ returnValue }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        switch (newValue) {
            case 0:
                returnValue('overdue');
                break;
            case 1:
                returnValue('borrowing');
                break;
            case 2:
                returnValue('returned');
                break;

            default:
                break;
        }
    };

    return (
        <Box sx={{ width: 'fit-content' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label='basic tabs example'
                >
                    <Tab className='tab' label='Overdue' {...a11yProps(0)} />
                    <Tab className='tab' label='Borrowing' {...a11yProps(1)} />
                    <Tab className='tab' label='Returned' {...a11yProps(2)} />
                </Tabs>
            </Box>
        </Box>
    );
};
