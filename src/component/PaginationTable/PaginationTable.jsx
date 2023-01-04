import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from '@mui/material';

PaginationTable.propTypes = {

};

function PaginationTable({ sx = {}, count, page, onChange = () => { } }) {
    return (
        <>
            <Pagination

                sx={{
                    ...sx,
                    // margin: "25px auto"
                    // marginLeft: "auto"



                }}



                spacing={2}
                count={count}
                page={page}
                color="primary"
                onChange={onChange}

            />
        </>
    );
}

export default PaginationTable;