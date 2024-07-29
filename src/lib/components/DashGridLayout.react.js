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
    const initializeLayout = () => {
        return props.children.map((child, i) => ({
            i: i.toString(),
            // eslint-disable-next-line no-magic-numbers
            x: i * 2 % 12,
            // eslint-disable-next-line no-magic-numbers
            y: Math.floor(i / 6) * 2,
            w: 2,
            h: 2,
            content: child,
        }));
    };

    const [items, setItems] = useState(initializeLayout());
    const [newCounter, setNewCounter] = useState(props.children.length);
    const [currentLayout, setCurrentLayout] = useState(props.currentLayout || items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })));

    useEffect(() => {
        if (props.setProps) {
            props.setProps({ itemCount: items.length, currentLayout: currentLayout });
        }
    }, [items, currentLayout]);

    useEffect(() => {
        if (props.addItem) {
            // eslint-disable-next-line no-use-before-define
            onAddItem();
        }
    }, [props.addItem]);

    const onLayoutChange = (layout) => {
        console.log("Layout changed:", layout);
        setCurrentLayout(layout);
        if (props.setProps) {
            props.setProps({ currentLayout: layout });
        }
        if (props.onLayoutChange) {
            props.onLayoutChange(layout);
        }
    };

    const onAddItem = () => {
        const newItem = {
            i: `n${newCounter}`,
            // eslint-disable-next-line no-magic-numbers
            x: (items.length * 2) % (props.cols.lg || 12),
            y: Infinity,
            w: 2,
            h: 2,
            content: props.newItemTemplate || <div>New Item</div>,
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        setNewCounter(newCounter + 1);

        const newLayout = [...currentLayout, { i: newItem.i, x: newItem.x, y: newItem.y, w: newItem.w, h: newItem.h }];
        setCurrentLayout(newLayout);
        if (props.setProps) {
            props.setProps({ currentLayout: newLayout, addItem: false });
        }
    };

    const onRemoveItem = (itemId) => {
        setItems(prevItems => prevItems.filter(item => item.i !== itemId));
        setCurrentLayout(prevLayout => prevLayout.filter(item => item.i !== itemId));
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
            display: props.showRemoveButton ? 'block' : 'none',
        };

        let content = el.content;
        if (content.type === DraggableWrapper) {
            content = React.cloneElement(content, {
                handleBackground: content.props.handleBackground,
                handleColor: content.props.handleColor,
                handleText: content.props.handleText,
                style: { ...content.props.style, height: '100%' }
            });
        }

        return (
            <div key={el.i} data-grid={el} style={{overflow: 'hidden', height: '100%'}}>
                {props.showRemoveButton && (
                    <span className="remove" style={removeStyle} onClick={() => onRemoveItem(el.i)}>×</span>
                )}
                {content}
            </div>
        );
    };

    return (
        <div id={props.id} style={props.style}>
            <ResponsiveReactGridLayout
                onLayoutChange={onLayoutChange}
                {...props}
                layouts={{ lg: currentLayout }}
                resizeHandles={props.showResizeHandles ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] : []}
                draggableHandle=".react-grid-dragHandle"
                compactType={props.compactType}
                isResizable={props.showResizeHandles}
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
    compactType: 'vertical',
    addItem: false,
    showRemoveButton: true,
    showResizeHandles: true,
    currentLayout: [],
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
    addItem: PropTypes.bool,
    compactType: PropTypes.oneOf(['vertical', 'horizontal', null]),
    showRemoveButton: PropTypes.bool,
    showResizeHandles: PropTypes.bool,
    currentLayout: PropTypes.arrayOf(PropTypes.shape({
        i: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        w: PropTypes.number,
        h: PropTypes.number,
    })),
    setProps: PropTypes.func,
};

export default DashGridLayout;

// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// import 'react-grid-layout/css/styles.css';
// import 'react-resizable/css/styles.css';
// import './DashGridLayout.css';
// import DraggableWrapper from './DraggableWrapper.react';
//
// // eslint-disable-next-line new-cap
// const ResponsiveReactGridLayout = WidthProvider(Responsive);
//
// const DashGridLayout = (props) => {
//     const initializeLayout = () => {
//         return props.children.map((child, i) => ({
//             i: i.toString(),
//             // eslint-disable-next-line no-magic-numbers
//             x: i * 2 % 12,
//             // eslint-disable-next-line no-magic-numbers
//             y: Math.floor(i / 6) * 2,
//             w: 2,
//             h: 2,
//             content: child,
//         }));
//     };
//
//     const [items, setItems] = useState(initializeLayout());
//     const [newCounter, setNewCounter] = useState(props.children.length);
//     const [currentLayout, setCurrentLayout] = useState(props.currentLayout || items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })));
//
//     useEffect(() => {
//         if (props.setProps) {
//             props.setProps({ itemCount: items.length, currentLayout: currentLayout });
//         }
//     }, [items, currentLayout]);
//
//     useEffect(() => {
//         if (props.addItem) {
//             // eslint-disable-next-line no-use-before-define
//             onAddItem();
//         }
//     }, [props.addItem]);
//
//     useEffect(() => {
//         // eslint-disable-next-line no-undefined
//         if (props.showRemoveButton !== undefined) {
//             // Update the items to reflect the new showRemoveButton state
//             setItems(prevItems => prevItems.map(item => ({...item, showRemoveButton: props.showRemoveButton})));
//         }
//         // eslint-disable-next-line no-undefined
//         if (props.showResizeHandles !== undefined) {
//             // Update the items to reflect the new showResizeHandles state
//             setItems(prevItems => prevItems.map(item => ({...item, showResizeHandles: props.showResizeHandles})));
//         }
//     }, [props.showRemoveButton, props.showResizeHandles]);
//
//     const onLayoutChange = (layout) => {
//         console.log("Layout changed:", layout);
//         setCurrentLayout(layout);
//         if (props.setProps) {
//             props.setProps({ currentLayout: layout });
//         }
//         if (props.onLayoutChange) {
//             props.onLayoutChange(layout);
//         }
//     };
//
//     const onAddItem = () => {
//         const newItem = {
//             i: `n${newCounter}`,
//             // eslint-disable-next-line no-magic-numbers
//             x: (items.length * 2) % (props.cols.lg || 12),
//             y: Infinity,
//             w: 2,
//             h: 2,
//             content: props.newItemTemplate || <div>New Item</div>,
//         };
//         const newItems = [...items, newItem];
//         setItems(newItems);
//         setNewCounter(newCounter + 1);
//
//         const newLayout = [...currentLayout, { i: newItem.i, x: newItem.x, y: newItem.y, w: newItem.w, h: newItem.h }];
//         setCurrentLayout(newLayout);
//         if (props.setProps) {
//             props.setProps({ currentLayout: newLayout, addItem: false });
//         }
//     };
//
//     const onRemoveItem = (itemId) => {
//         setItems(prevItems => prevItems.filter(item => item.i !== itemId));
//         setCurrentLayout(prevLayout => prevLayout.filter(item => item.i !== itemId));
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
//             display: props.showRemoveButton ? 'block' : 'none',
//         };
//
//         let content = el.content;
//         if (content.type === DraggableWrapper) {
//             content = React.cloneElement(content, {
//                 handleBackground: content.props.handleBackground,
//                 handleColor: content.props.handleColor,
//                 handleText: content.props.handleText,
//                 id: content.props.id,
//                 style: { ...content.props.style, height: '100%' },
//                 showDragHandle: props.showDragHandle,
//             });
//         }
//
//         return (
//             <div key={el.i} data-grid={el} style={{overflow: 'hidden', height: '100%'}}>
//                 {props.showRemoveButton && (
//                     <span className="remove" style={removeStyle} onClick={() => onRemoveItem(el.i)}>×</span>
//                 )}
//                 {content}
//             </div>
//         );
//     };
//
//     return (
//         <div id={props.id} style={props.style}>
//             <ResponsiveReactGridLayout
//                 onLayoutChange={onLayoutChange}
//                 {...props}
//                 layouts={{ lg: currentLayout }}
//                 resizeHandles={props.showResizeHandles ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] : []}
//                 draggableHandle=".react-grid-dragHandle"
//                 compactType={props.compactType}
//                 isResizable={props.showResizeHandles}
//             >
//                 {items.map(createElement)}
//             </ResponsiveReactGridLayout>
//         </div>
//     );
// };
//
// DashGridLayout.defaultProps = {
//     className: "layout",
//     rowHeight: 100,
//     cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
//     onLayoutChange: () => {},
//     compactType: 'vertical',
//     addItem: false,
//     showRemoveButton: true,
//     showResizeHandles: true,
//     currentLayout: [],
//     showDragHandle: true,
// };
//
// DashGridLayout.propTypes = {
//     id: PropTypes.string,
//     children: PropTypes.node,
//     onLayoutChange: PropTypes.func,
//     newItemTemplate: PropTypes.node,
//     className: PropTypes.string,
//     rowHeight: PropTypes.number,
//     cols: PropTypes.object,
//     style: PropTypes.object,
//     itemCount: PropTypes.number,
//     addItem: PropTypes.bool,
//     compactType: PropTypes.oneOf(['vertical', 'horizontal', null]),
//     showRemoveButton: PropTypes.bool,
//     showResizeHandles: PropTypes.bool,
//     showDragHandle: PropTypes.bool,
//     currentLayout: PropTypes.arrayOf(PropTypes.shape({
//         i: PropTypes.string,
//         x: PropTypes.number,
//         y: PropTypes.number,
//         w: PropTypes.number,
//         h: PropTypes.number,
//     })),
//     setProps: PropTypes.func,
// };
//
// export default DashGridLayout;
