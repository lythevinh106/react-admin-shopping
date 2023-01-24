import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryApi from '../../ApiServices/CategoryApi';

// const listFilter = [
//     {
//         name: "Mới Tới Cũ",
//         value: "asc"
//     },
//     {
//         name: "Cũ Tới Mới",
//         value: "desc"
//     },
// ]

function FilterCategory({ onFilterCatChange = () => { } }) {

    const [categories, setCategories] = useState([]);
    const [FilterCategory, setFilterCategory] = React.useState("");


    // console.log(categories[0]?.id);


    useEffect(() => {

        (async () => {

            const response = await CategoryApi.getAllCategory({ limit: 1000 });

            console.log(response.data)
            setCategories(response.data);


        })();

    }, [])



    const handleChange = (event) => {
        // console.log(event.target.value);
        setFilterCategory(event.target.value);

        onFilterCatChange(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Danh Mục</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={FilterCategory}
                    label="Lọc Theo"
                    onChange={handleChange}
                >
                    {categories.map((filter, index) => {

                        return (<MenuItem key={index} value={filter.id}>{filter.name}</MenuItem>)
                    })}


                </Select>
            </FormControl>
        </Box>
    );
}

export default FilterCategory;