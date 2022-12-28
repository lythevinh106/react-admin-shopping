import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
DrawerCreate.propTypes = {

};

function DrawerCreate(props) {
    const [state, setState] = React.useState(false);


    const toggleDrawer = (event, state) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState(state);
    };


    const componentDrawer = () => (
        <Box
            sx={{ width: "100%" }}
            role="presentation"
            onClick={(e) => toggleDrawer(e, false)}
        // onKeyDown={toggleDrawer("bottom", false)}

        >
            noi dung 1

        </Box>
    );

    return (
        <div>

            <React.Fragment >
                <Button onClick={(e) => toggleDrawer(e, true)}>{"bottom"}</Button>
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={state}
                    onClose={(e) => toggleDrawer(e, false)}
                    onOpen={(e) => toggleDrawer(e, true)}
                >
                    {componentDrawer()}
                </SwipeableDrawer>
            </React.Fragment>

        </div>
    );
}

export default DrawerCreate;