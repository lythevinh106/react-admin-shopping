import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProductContext } from '../../../context/ProductProvider';
import { Button, Typography } from '@mui/material';
import myColor from '../../myColor/myColor';

ModalRemoveProduct.propTypes = {

};

function ModalRemoveProduct() {

    const { handleOnYesRemove,
        handleOnNoRemove, isOpenRemove } = useContext(ProductContext);

    const onYEsRemove = () => {

        // console.log(isOpenRemove);
        if (isOpenRemove == false) return;
        handleOnYesRemove(isOpenRemove)
    }

    const onNoRemove = () => {
        // handleOnNoRemove()
    }

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
                    onClick={() => { onYEsRemove() }}
                >Đồng Ý</Button>

                <Button onClick={() => { onNoRemove() }} variant='contained'>Thoát</Button>
            </Typography>
        </>
    );
}

export default ModalRemoveProduct;