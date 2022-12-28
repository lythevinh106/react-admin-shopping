import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';

PaginationTable.propTypes = {

};

function PaginationTable({ sx = {} }) {
    return (
        <>
            <Pagination

                sx={{
                    ...sx,
                    // margin: "25px auto"
                    // marginLeft: "auto"



                }}



                spacing={2}
                count={10}
                page={2}
                color="primary"
            // onChange={handleChange} 

            />
        </>
    );
}

export default PaginationTable;