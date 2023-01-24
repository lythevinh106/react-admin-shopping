import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
InputSearch.propTypes = {

};

function InputSearch({ onChange = () => { }, title = "" }) {


    return (
        <>
            <TextField
                placeholder={title}
                onChange={(e) => {
                    onChange(e)
                }} size='small' label={<SearchIcon sx={{
                    backgroundColor: "transparent"
                }} />}></TextField>
        </>
    );
}

export default InputSearch;