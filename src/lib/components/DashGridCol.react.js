import React from 'react';
import PropTypes from 'prop-types';

const DashGridCol = (props) => {
    const {children, size, ...otherProps} = props;
    return (
        <div data-grid={{w: size[0], h: size[1]}} {...otherProps}>
            {children}
        </div>
    );
};

DashGridCol.propTypes = {
    children: PropTypes.node.isRequired,
    size: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DashGridCol;
