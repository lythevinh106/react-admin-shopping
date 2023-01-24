import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CategoryApi from '../../ApiServices/CategoryApi';

const listFilterStatus = [
    {
        name: "Hủy Đơn Hàng",
        value: -1
    },
    {
        name: "Chờ Xác Nhận",
        value: 0
    },
    {
        name: "Đã Xác Nhận",
        value: 1
    },
    {
        name: "Đang Vận Chuyển",
        value: 2
    },
    {
        name: "Giao Thành Công",
        value: 3
    },

]

function FilterStatusOrder({ onFilterStatusChange = () => { } }) {

    const [status, setStatus] = useState(listFilterStatus);
    const [FilterStatusOrder, setFilterStatusOrder] = React.useState("");


    // console.log(categories[0]?.id);






    const handleChange = (event) => {
        // console.log(event.target.value);
        setFilterStatusOrder(event.target.value);

        onFilterStatusChange(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Trạng thái</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={FilterStatusOrder}
                    label="Lọc Theo"
                    onChange={handleChange}
                >
                    {status.map((sta, index) => {

                        return (<MenuItem key={index} value={sta.value}>{sta.name}</MenuItem>)
                    })}


                </Select>
            </FormControl>
        </Box>
    );
}

export default FilterStatusOrder;