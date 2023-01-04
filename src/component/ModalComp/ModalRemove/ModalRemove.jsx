import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import myColor from '../../myColor/myColor';
ModalRemove.propTypes = {

};

function ModalRemove({ onYEsRemove, onNoRemove }) {


    return (
        <>
            <Typography variant="h7" sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: myColor.greenDefault

            }}>
                Bạn Đồng Ý Xóa ?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 5, display: "flex", justifyContent: "space-around" }} >
                <Button variant='contained' color="error"
                    onClick={onYEsRemove}
                >Đồng Ý</Button>

                <Button onClick={onNoRemove} variant='contained'>Thoát</Button>
            </Typography>
        </>
    );
}

export default ModalRemove;