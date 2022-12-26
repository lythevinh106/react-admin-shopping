import React from 'react';
import PropTypes from 'prop-types';
import { styled, Typography } from '@mui/material';
import myColor from '../myColor/myColor';

TitleContent.propTypes = {

};

function TitleContent({ content }) {

    const MyTypo = styled(Typography)({

        color: myColor.greenSecond,
        textAlign: "center",
        fontSize: "40px",
        fontWeight: "bold"

    })

    return (
        <MyTypo  >
            {content}
        </MyTypo>
    );
}

export default TitleContent;