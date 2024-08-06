import React from 'react';
import PropTypes from 'prop-types';

/**
 * DashGridLayout is a flexible grid layout system for arranging and moving components within a Dash application.
 * It leverages the react-grid-layout library to provide responsive and draggable grid items.
 */
const DraggableWrapper = (props) => {
    const dragHandleStyle = {
        padding: '5px',
        cursor: 'move',
        background: props.handleBackground || 'rgb(85,85,85)',
        textAlign: 'center',
        color: props.handleColor || 'white',
    };

    return (
        <div
            id={props.id}
            style={{height: '100%', display: 'flex', flexDirection: 'column'}}
        >
            <div className="react-grid-dragHandle" style={dragHandleStyle}>
                {props.handleText || 'Drag here'}
            </div>
            <div style={{flex: 1, overflow: 'hidden'}}>{props.children}</div>
        </div>
    );
};

DraggableWrapper.propTypes = {
    /**
     * The content to be wrapped and made draggable.
     */
    children: PropTypes.node,

    /**
     * The background color of the drag handle.
     */
    handleBackground: PropTypes.string,

    /**
     * The text color of the drag handle.
     */
    handleColor: PropTypes.string,

    /**
     * The text to display in the drag handle.
     */
    handleText: PropTypes.string,

    /**
     * A unique identifier for the DraggableWrapper component.
     */
    id: PropTypes.string,
};

DraggableWrapper.defaultProps = {
    handleBackground: 'rgb(85,85,85)',
    handleColor: 'white',
    handleText: 'Drag here',
};

export default DraggableWrapper;
