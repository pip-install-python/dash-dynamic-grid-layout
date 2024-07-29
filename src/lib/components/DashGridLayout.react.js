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

    const [items, setItems] = useState([]);
    const [newCounter, setNewCounter] = useState(0);
    const [currentLayout, setCurrentLayout] = useState([]);
    const [resizing, setResizing] = useState(false)
    const [breakpointData, setBreakpointData] = useState({});
    const [breakpoints, setBreakpoints] = useState({lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0})

    const findCurrentBreakpoint = () => {
        const currentWidth = window.innerWidth;
        let breakpoints = {...breakpoints, ...props.breakpoints}
        let currentBreakpoint = null;
        setBreakpoints(breakpoints)

        if (currentWidth >= breakpoints.lg) {
          currentBreakpoint = 'lg';
        } else if (currentWidth >= breakpoints.md) {
          currentBreakpoint = 'md';
        } else if (currentWidth >= breakpoints.sm) {
          currentBreakpoint = 'sm';
        } else if (currentWidth >= breakpoints.xs) {
          currentBreakpoint = 'xs';
        } else {
          currentBreakpoint = 'xxs';
        }
        return currentBreakpoint
    }

    // initial call
    useEffect(() => {
        setCurrentLayout(props.currentLayout || items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })))
        setItems(props.items || initializeLayout())
        setNewCounter(props.children.length)
        // get initial screen size
        setBreakpointData({newBreakpoint: findCurrentBreakpoint()})
    }, [])

    useEffect(() => {
        if (props.setProps) {
            props.setProps({ itemCount: items.length});
        }
    }, [items]);

    useEffect(() => {
        if (props.addItem) {
            // eslint-disable-next-line no-use-before-define
            onAddItem();
        }
    }, [props.addItem]);

    const onLayoutChange = (layout, allLayouts) => {
        if (breakpointData?.newBreakpoint == 'lg') {
            const newItems = items.map((item) => {
                const newItem = layout.filter(i => i.i === item.i)[0]
                return {...item, ...newItem}
            })
            setItems(newItems)
        }
        if (props.setProps) {
            props.setProps({ currentLayout: layout });
        }
    };

    const onBreakpointChange = (newBreakpoint, newCols) => {
        setBreakpointData({newBreakpoint, newCols})
        props.setProps({breakpointData: {newBreakpoint, newCols}})
    }

    const onAddItem = () => {
        const newItem = {
            i: `n${newCounter}`,
            // eslint-disable-next-line no-magic-numbers
            x: 0,
            y: 0,
            w: 2,
            h: 2,
            content: props.newItemTemplate || <div>New Item</div>,
        };
        const newItems = [...items, newItem];
        setItems(newItems);
        setNewCounter(newCounter + 1);

        if (props.setProps) {
            props.setProps({addItem: false });
        }
    };

    const onRemoveItem = (itemId) => {
        setItems(prevItems => prevItems.filter(item => item.i !== itemId));
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
                layouts={{ lg: currentLayout }}
                resizeHandles={props.showResizeHandles ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] : []}
                draggableHandle=".react-grid-dragHandle"
                isResizable={props.showResizeHandles}
                onBreakpointChange={onBreakpointChange}
                {...props}
                breakpoints={breakpoints}
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
    compactType: 'vertical',
    addItem: false,
    showRemoveButton: true,
    showResizeHandles: true,
    currentLayout: [],
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}
};

DashGridLayout.propTypes = {
    id: PropTypes.string,
    children: PropTypes.node,
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
    breakpointData: PropTypes.shape({
        newBreakpoint: PropTypes.string,
        newCols: PropTypes.number
      }),
    breakpoints: PropTypes.shape({
        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,
        xxs: PropTypes.number
      })
};

export default DashGridLayout;