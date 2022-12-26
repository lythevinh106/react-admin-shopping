import React from 'react';
import PropTypes from 'prop-types';
import "./style.scss"
GlobalStyles.propTypes = {

};

function GlobalStyles({ children }) {
    return (
        <div>
            {children}
        </div>
    );
}

export default GlobalStyles;