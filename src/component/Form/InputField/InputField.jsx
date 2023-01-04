import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';

InputField.propTypes = {

};

function InputField({ form, name, sx, label, type = "text", ...other }) {
    const { register, handleSubmit, watch, formState: { errors } } = form

    return (
        <>
            <TextField
                sx={sx}
                {...register(name)}

                fullWidth size='small'
                error={errors[name] ? true : false}
                type={type}



                helperText={errors[name]?.message}
                label={label} variant="standard"

                {...other}


            />
        </>
    );
}

export default InputField;