import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

InputField.propTypes = {

};

function InputField({ form, name, sx, label, readOnly = false, type = "text", control, defaultValue = "", value, onChange = () => { }, ...other }) {
    const { register, handleSubmit, watch, getFieldState, formState: { errors } } = form


    return (
        <>
            <TextField
                sx={sx}

                {...register(name)}

                fullWidth size='small'
                error={errors[name] ? true : false}
                type={type}
                value={value}
                helperText={errors[name]?.message}
                label={label} variant="standard"
                onChange={(e) => onChange(e)}
                {...other}

                InputProps={{
                    readOnly: readOnly,
                }}


            />



        </>
    );
}

export default InputField;