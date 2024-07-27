import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashGridLayout.css';
import DraggableWrapper from './DraggableWrapper.react';

// eslint-disable-next-line new-cap
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DashGridLayout = (props) => {
    const [items, setItems] = useState(props.children.map((child, i) => ({
        i: i.toString(),
        // eslint-disable-next-line no-magic-numbers
        x: i * 2 % 12,
        // eslint-disable-next-line no-magic-numbers
        y: Math.floor(i / 6) * 2,
        w: 2,
        h: 2,
        content: child,
    })));
    const [newCounter, setNewCounter] = useState(props.children.length);

    useEffect(() => {
        if (props.setProps) {
            props.setProps({ itemCount: items.length });
        }
    }, [items]);

    const onAddItem = () => {
        setItems(items.concat({
            i: `n${newCounter}`,
            // eslint-disable-next-line no-magic-numbers
            x: (items.length * 2) % 12,
            y: Infinity,
            w: 2,
            h: 2,
            content: props.newItemTemplate || <div>New Item</div>,
            useDragHandle: false
        }));
        setNewCounter(newCounter + 1);
    };

    const onRemoveItem = (itemId) => {
        setItems(items.filter(item => item.i !== itemId));
    };

    const createElement = (el) => {
        const removeStyle = {
            position: "absolute",
            right: "5px",
            top: "5px",
            cursor: "pointer",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.7)",
            padding: "5px 10px",
            borderRadius: "50%",
            fontSize: "16px",
            fontWeight: "bold",
        };

        let content = el.content;
        if (content.type === DraggableWrapper) {
            content = React.cloneElement(content, {
                style: { ...content.props.style, height: '100%' }
            });
        }

        return (
            <div key={el.i} data-grid={el} style={{overflow: 'hidden', height: '100%'}}>
                <span className="remove" style={removeStyle} onClick={() => onRemoveItem(el.i)}>×</span>
                {content}
            </div>
        );
    };

    return (
        <div id={props.id} style={props.style}>
            {props.allowAddItem && (
                <button onClick={onAddItem} style={{marginBottom: '10px'}}>Add Item</button>
            )}
            <ResponsiveReactGridLayout
                onLayoutChange={props.onLayoutChange}
                {...props}
                resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
                draggableHandle=".react-grid-dragHandle"
                compactType={props.compactType}
            >
                {items.map(createElement)}
            </ResponsiveReactGridLayout>
        </div>
    );
};

DashGridLayout.defaultProps = {
    className: "layout",
    rowHeight: 100,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    onLayoutChange: () => {},
    allowAddItem: true,
    compactType: 'vertical',
};

DashGridLayout.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
    onLayoutChange: PropTypes.func,
    newItemTemplate: PropTypes.node,
    className: PropTypes.string,
    rowHeight: PropTypes.number,
    cols: PropTypes.object,
    style: PropTypes.object,
    itemCount: PropTypes.number,
    allowAddItem: PropTypes.bool,
    compactType: PropTypes.oneOf(['vertical', 'horizontal', null]),
    setProps: PropTypes.func
};

export default DashGridLayout;

// Backup


// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';
// import './DashGridLayout.css';
//
// // eslint-disable-next-line new-cap
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
//
// const DashGridLayout = (props) => {
//     const [items, setItems] = useState(props.children.map((child, i) => ({
//         i: i.toString(),
//         // eslint-disable-next-line no-magic-numbers
//         x: i * 2 % 12,
//         // eslint-disable-next-line no-magic-numbers
//         y: Math.floor(i / 6) * 2,
//         w: 2,
//         h: 2,
//         content: child,
//     })));
//     const [newCounter, setNewCounter] = useState(props.children.length);
//
//     useEffect(() => {
//         if (props.setProps) {
//             props.setProps({ itemCount: items.length });
//         }
//     }, [items]);
//
//     const onAddItem = () => {
//         setItems(items.concat({
//             i: `n${newCounter}`,
//             // eslint-disable-next-line no-magic-numbers
//             x: (items.length * 2) % 12,
//             y: Infinity,
//             w: 2,
//             h: 2,
//             content: props.newItemTemplate || <div>New Item</div>,
//         }));
//         setNewCounter(newCounter + 1);
//     };
//
//     const onRemoveItem = (itemId) => {
//         setItems(items.filter(item => item.i !== itemId));
//     };
//
//     const createElement = (el) => {
//         const removeStyle = {
//             position: "absolute",
//             right: "5px",
//             top: "5px",
//             cursor: "pointer",
//             zIndex: 1000,
//             background: "rgba(255, 255, 255, 0.7)",
//             padding: "5px 10px",
//             borderRadius: "50%",
//             fontSize: "16px",
//             fontWeight: "bold",
//         };
//         return (
//             <div key={el.i} data-grid={el} style={{overflow: 'hidden', padding: '10px'}}>
//                 <span className="remove" style={removeStyle} onClick={() => onRemoveItem(el.i)}>×</span>
//                 {el.content}
//             </div>
//         );
//     };
//
//     return (
//         <div id={props.id} style={props.style}>
//             {props.allowAddItem && (
//                 <button onClick={onAddItem} style={{marginBottom: '10px'}}>Add Item</button>
//             )}
//             <ResponsiveReactGridLayout
//                 onLayoutChange={props.onLayoutChange}
//                 {...props}
//                 resizeHandles={['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']}
//             >
//                 {items.map(createElement)}
//             </ResponsiveReactGridLayout>
//         </div>
//     );
// };
//
//
// DashGridLayout.defaultProps = {
//     className: "layout",
//     rowHeight: 100,
//     cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//     onLayoutChange: () => {},
//     allowAddItem: true,
//     // useDragHandle: false
// };
//
// DashGridLayout.propTypes = {
//     /**
//      * The ID used to identify this component in Dash callbacks.
//      */
//     id: PropTypes.string,
//
//     /**
//      * The children of this component.
//      */
//     children: PropTypes.node,
//
//     /**
//      * A callback function that is called when the layout changes.
//      */
//     onLayoutChange: PropTypes.func,
//
//     /**
//      * A template for new items added to the grid.
//      */
//     newItemTemplate: PropTypes.node,
//
//     /**
//      * CSS class name for the layout.
//      */
//     className: PropTypes.string,
//
//     /**
//      * The height of a single row in pixels.
//      */
//     rowHeight: PropTypes.number,
//
//     /**
//      * An object containing breakpoints and column numbers.
//      */
//     cols: PropTypes.object,
//
//     /**
//      * Inline style object for the component.
//      */
//     style: PropTypes.object,
//
//     /**
//      * The number of items in the grid.
//      */
//     itemCount: PropTypes.number,
//
//     /**
//      * Whether to allow adding new items to the grid.
//      */
//     allowAddItem: PropTypes.bool,
//
//     /**
//      * Whether to use drag handles for all items in the grid.
//      */
//
//     /**
//      * Dash-assigned callback that should be called to report property changes
//      * to Dash, to make them available for callbacks.
//      */
//     setProps: PropTypes.func
// };
//
// export default DashGridLayout;