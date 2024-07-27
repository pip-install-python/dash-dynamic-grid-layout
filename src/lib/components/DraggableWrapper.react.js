import React from 'react';
import PropTypes from 'prop-types';

const DraggableWrapper = (props) => {
    const dragHandleStyle = {
        padding: "5px",
        cursor: "move",
        background: "rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    };

    return (
        <div style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <div className="react-grid-dragHandle" style={dragHandleStyle}>
                Drag here
            </div>
            <div style={{flex: 1, overflow: 'hidden'}}>
                {props.children}
            </div>
        </div>
    );
};

DraggableWrapper.propTypes = {
    children: PropTypes.node,
};

export default DraggableWrapper;