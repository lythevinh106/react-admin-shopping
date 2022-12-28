import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
InputSearch.propTypes = {

};

function InputSearch(props) {
    return (
        <>
            <TextField size='small' label={<SearchIcon sx={{
                backgroundColor: "transparent"
            }} />}></TextField>
        </>
    );
}

export default InputSearch;