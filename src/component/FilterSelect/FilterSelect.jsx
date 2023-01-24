import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
FilterSelect.propTypes = {

};

const listSort = [
    {
        name: "Mới Tới Cũ",
        value: "asc"
    },
    {
        name: "Cũ Tới Mới",
        value: "desc"
    },
]

function FilterSelect({ onSortChange = () => { } }) {
    const [sortCategory, setSortCategory] = React.useState("desc");

    const handleChange = (event) => {
        setSortCategory(event.target.value);
        onSortChange(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Lọc Theo</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={sortCategory}
                    label="Lọc Theo"
                    onChange={handleChange}
                >
                    {listSort.map((sort, index) => {

                        return (<MenuItem key={index} value={sort.value}>{sort.name}</MenuItem>)
                    })}


                </Select>
            </FormControl>
        </Box>
    );
}

export default FilterSelect;