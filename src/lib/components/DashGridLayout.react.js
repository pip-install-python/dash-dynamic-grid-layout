import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Responsive, WidthProvider} from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashGridLayout.css';
import DraggableWrapper from './DraggableWrapper.react';
import _ from 'lodash';

// eslint-disable-next-line new-cap
const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * DashGridLayout is a flexible grid layout system for arranging and moving components within a Dash application.
 * It leverages the react-grid-layout library to provide responsive and draggable grid items.
 */
const DashGridLayout = ({setProps, ...props}) => {
    const [layoutItems, setItems] = useState([]);
    const [currentLayout, setCurrentLayout] = useState([]);
    const [breakpoints, setBreakpoints] = useState({
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0,
    });
    const gridLayoutRef = useRef(null);
    const [init, setInit] = useState(false);
    const layoutItemsRef = useRef([]);
    const systemUpdateItems = useRef(null);
    const setPropsRef = useRef(null);
    const updateDashLayout = useRef(null);

    const findCurrentBreakpoint = (init = false) => {
        const currentWidth = gridLayoutRef.current.clientWidth;
        if (init) {
            // eslint-disable-next-line no-use-before-define
            const breakpoints = {...breakpoints, ...props.breakpoints};
            setBreakpoints(breakpoints);
        }
        let currentBreakpoint = null;

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
        return currentBreakpoint;
    };

    const convertPropsToLayout = (items) => {
        const newItems = [...items].map((item, i) => {
            return {
                ...{
                    i: item.key,
                    // eslint-disable-next-line no-magic-numbers
                    x: (i * 2) % 12,
                    // eslint-disable-next-line no-magic-numbers
                    y: Math.floor(i / 6) * 2,
                    w: 2,
                    h: 2,
                    content: item,
                },
                ...props.itemLayout.filter((i) => i.i === item.key)[0],
            };
        });
        return newItems;
    };

    // initial call
    useEffect(() => {
        setPropsRef.current = _.debounce((props) => {
            setProps(props);
            // eslint-disable-next-line no-magic-numbers
        }, 50);
        updateDashLayout.current = _.debounce((layoutItems) => {
            const propsToSet = {itemCount: layoutItems.length};
            if (!_.isEmpty(layoutItems)) {
                const newLayoutItems = layoutItems.map((item) => {
                    return _.omit(item, ['content']);
                });
                if (!_.isEqual(newLayoutItems, props.itemLayout)) {
                    propsToSet.itemLayout = newLayoutItems;
                    systemUpdateItems.current = true;
                }
                layoutItemsRef.current = newLayoutItems;
            }
            setPropsRef.current(propsToSet);
            // eslint-disable-next-line no-magic-numbers
        }, 50);
        setCurrentLayout(
            props.currentLayout ||
                layoutItems.map(({i, x, y, w, h}) => ({i, x, y, w, h}))
        );
        const newItems = convertPropsToLayout(props.items);
        setItems(newItems);
        setInit(true);
    }, []);

    useEffect(() => {
        if (updateDashLayout.current) {
            updateDashLayout.current(layoutItems);
        }
    }, [layoutItems]);

    const updateItemsFromPropsDebounced = _.debounce(() => {
        if (!_.isEqual(layoutItemsRef, props.items)) {
            setItems(convertPropsToLayout(props.items));
        }
        // eslint-disable-next-line no-magic-numbers
    }, 5);

    useEffect(() => {
        if (init) {
            updateItemsFromPropsDebounced();
        }
    }, [props.items, props.itemLayout]);

    const onLayoutChange = _.debounce((layout) => {
        if (findCurrentBreakpoint() === 'lg') {
            const newItems = [...layoutItems].map((item) => {
                const newItem = layout.filter((i) => i.i === item.i)[0];
                return {...item, ...newItem};
            });
            setTimeout(() => setItems(newItems), 1);
        }
        if (setProps.current) {
            setProps.current({currentLayout: layout});
        }
        // eslint-disable-next-line no-magic-numbers
    }, 5);

    const onBreakpointChange = _.debounce((newBreakpoint, newCols) => {
        setProps({breakpointData: {newBreakpoint, newCols}});
        // eslint-disable-next-line no-magic-numbers
    }, 5);

    const createElement = (el) => {
        const removeStyle = {
            position: 'absolute',
            right: '5px',
            top: '5px',
            cursor: 'pointer',
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.7)',
            padding: '5px 10px',
            borderRadius: '50%',
            fontSize: '16px',
            fontWeight: 'bold',
            display: props.showRemoveButton ? 'block' : 'none',
        };

        let content = el.content;
        if (_.get(content, ['type']) === DraggableWrapper) {
            content = React.cloneElement(content, {
                handleBackground: content.props.handleBackground,
                handleColor: content.props.handleColor,
                handleText: content.props.handleText,
                style: {...content.props.style, height: '100%'},
            });
        }

        return (
            <div
                key={el.i}
                data-grid={el}
                style={{overflow: 'hidden', height: '100%'}}
            >
                {props.showRemoveButton && (
                    <span
                        className="remove"
                        style={removeStyle}
                        onClick={() => setProps({itemToRemove: el.i})}
                    >
                        ×
                    </span>
                )}
                {content}
            </div>
        );
    };

    return (
        <div id={props.id} style={props.style} ref={gridLayoutRef}>
            <ResponsiveReactGridLayout
                onDragStop={onLayoutChange}
                onResizeStop={onLayoutChange}
                layouts={{lg: currentLayout}}
                resizeHandles={
                    props.showResizeHandles
                        ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne']
                        : []
                }
                draggableHandle=".react-grid-dragHandle"
                isResizable={props.showResizeHandles}
                onBreakpointChange={onBreakpointChange}
                {..._.omit(props, ['items'])}
                breakpoints={breakpoints}
                preventCollision={!props.compactType}
            >
                {layoutItems.map(createElement)}
            </ResponsiveReactGridLayout>
        </div>
    );
};

DashGridLayout.defaultProps = {
    className: 'layout',
    rowHeight: 100,
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    compactType: 'vertical',
    showRemoveButton: true,
    showResizeHandles: true,
    currentLayout: [],
    breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    items: [],
    itemLayout: [],
    persisted_props: ['items', 'itemLayout'],
    persistence_type: 'local',
    itemToRemove: '',
};

DashGridLayout.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks.
     */
    id: PropTypes.string,

    /**
     * CSS class name for the grid layout.
     */
    className: PropTypes.string,

    /**
     * The height of a single row in pixels.
     */
    rowHeight: PropTypes.number,

    /**
     * An object containing breakpoints and column numbers.
     */
    cols: PropTypes.object,

    /**
     * Inline styles for the grid layout.
     */
    style: PropTypes.object,

    /**
     * The number of items in the grid.
     */
    itemCount: PropTypes.number,

    itemToRemove: PropTypes.any,

    /**
     * Compaction type. Can be 'vertical', 'horizontal', or null.
     */
    compactType: PropTypes.oneOf(['vertical', 'horizontal', null]),

    /**
     * Whether to show remove buttons for grid items.
     */
    showRemoveButton: PropTypes.bool,

    /**
     * Whether to show resize handles for grid items.
     */
    showResizeHandles: PropTypes.bool,

    /**
     * Whether to persist the component's state.
     */
    persistence: PropTypes.bool,

    /**
     * List of props to persist.
     */
    persisted_props: PropTypes.array,

    /**
     * Type of persistence ('local', 'memory', 'session').
     */
    persistence_type: PropTypes.oneOf(['local', 'memory', 'session']),

    /**
     * List of items to be rendered in the grid.
     */
    items: PropTypes.arrayOf(PropTypes.node),

    /**
     * Layout configuration for each item.
     */
    itemLayout: PropTypes.arrayOf(
        PropTypes.shape({
            i: PropTypes.string,
            x: PropTypes.number,
            y: PropTypes.number,
            w: PropTypes.number,
            h: PropTypes.number,
        })
    ),

    /**
     * The current layout of the grid items.
     */
    currentLayout: PropTypes.arrayOf(
        PropTypes.shape({
            i: PropTypes.string,
            x: PropTypes.number,
            y: PropTypes.number,
            w: PropTypes.number,
            h: PropTypes.number,
        })
    ),

    /**
     * Callback function to update Dash props.
     */
    setProps: PropTypes.func,

    /**
     * Data about the current breakpoint and columns.
     */
    breakpointData: PropTypes.shape({
        newBreakpoint: PropTypes.string,
        newCols: PropTypes.number,
    }),

    /**
     * Breakpoints for responsive layout.
     */
    breakpoints: PropTypes.shape({
        lg: PropTypes.number,
        md: PropTypes.number,
        sm: PropTypes.number,
        xs: PropTypes.number,
        xxs: PropTypes.number,
    }),
};

export default DashGridLayout;
