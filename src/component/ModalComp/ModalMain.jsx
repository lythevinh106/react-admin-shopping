import React, { useContext, useEffect, useState } from 'react';

import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    borderRadius: "10px",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    textAlign: "center",
    outLine: "none",

    p: 2,
};

function ModalMain({ oncloseRemoveBtn = () => { }, component = <></>, width = 400 }) {



    const handleOnclose = () => {
        oncloseRemoveBtn();
    }

    return (

        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={true}
                onClose={handleOnclose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} width={width}>
                    {component}


                </Box>

            </Modal>
        </div >

    );
}

export default ModalMain;