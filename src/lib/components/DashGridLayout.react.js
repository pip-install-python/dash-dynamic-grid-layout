import React, {useState, useEffect, useRef, useCallback} from 'react';
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
const DashGridLayout = ({setProps, items, itemLayout, ...props}) => {
    const layoutItemsRef = useRef([]);

    const convertPropsToLayout = useCallback(
        (items) => {
            const newItems = [...items].map((item, index) => {
                return {
                    ...{
                        i: item.key,
                        // eslint-disable-next-line no-magic-numbers
                        x: (index * 2) % 12,
                        // eslint-disable-next-line no-magic-numbers
                        y: Math.floor(index / 6) * 2,
                        w: 2,
                        h: 2,
                        content: item,
                    },
                    ...layoutItemsRef.current.filter(
                        (i) => i.i === item.key
                    )[0],
                };
            });
            return newItems;
        },
        [itemLayout]
    );

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
              data-grid={_.pick(el, ['w', 'h', 'x', 'y', 'minW', 'minH'])}
            >
              <div
                className={!props.showResizeHandles ? 'react-resizable-hide' : ''}
                style={
                    props.showResizeHandles
                      ? { ...props.draggableChildStyle }
                      : { overflow: 'hidden', height: '100%' } /* Original style when not in edit mode */
                  }
        
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
            </div>
          );
        };

    const [layoutItems, setItems] = useState([]);
    const [breakpoints, setBreakpoints] = useState({
        lg: 1200,
        md: 996,
        sm: 768,
        xs: 480,
        xxs: 0,
    });
    const gridLayoutRef = useRef(null);
    const [init, setInit] = useState(false);

    const systemUpdateItems = useRef(null);
    const previousItems = useRef([]);
    const [gridLayout, setGridLayout] = useState([]);
    const currentEdit = useRef({
        showRemoveButton: props.showRemoveButton,
        showResizeHandles: props.showResizeHandles,
    });
    const updateItemsFromPropsDebounced = useRef(null);

    const findCurrentBreakpoint = useCallback(
        (init = false) => {
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
        },
        [gridLayoutRef]
    );

    const updateDashLayoutDebounced = useCallback(
        _.debounce((layoutItems) => {
            const propsToSet = {itemCount: layoutItems.length};
            if (!_.isEmpty(layoutItems)) {
                const newLayoutItems = layoutItems.map((item) =>
                    _.pick(item, ['i', 'x', 'y', 'w', 'h'])
                );
                if (!_.isEqual(newLayoutItems, itemLayout)) {
                    propsToSet.itemLayout = newLayoutItems;
                    systemUpdateItems.current = true;
                }
                layoutItemsRef.current = newLayoutItems;
            }
            setProps(propsToSet);
            // eslint-disable-next-line no-magic-numbers
        }, 50),
        [itemLayout]
    );

    // initial call
    useEffect(() => {
        updateItemsFromPropsDebounced.current = _.debounce((items) => {
            setItems(convertPropsToLayout(items));
            // eslint-disable-next-line no-magic-numbers
        }, 50);
        setProps({
            breakpointData: {newBreakpoint: findCurrentBreakpoint(true)},
        });
        setInit(true);
    }, []);

    useEffect(() => {
        if (updateDashLayoutDebounced && init) {
            updateDashLayoutDebounced(layoutItems);
            setGridLayout(layoutItems.map(createElement));
        }
    }, [layoutItems]);

    const stripItems = (compItems) => {
        const newItems = [];
        compItems.map((i) => {
            const dets = {key: i.key};
            dets.props =
                _.get(i, ['props', '_dashprivate_layout']) ||
                _.get(i, ['props']);
            newItems.push(dets);
        });
        return newItems;
    };

    useEffect(() => {
        if (init) {
            if (
                !_.isEqual(currentEdit.current, {
                    showRemoveButton: props.showRemoveButton,
                    showResizeHandles: props.showResizeHandles,
                })
            ) {
                updateItemsFromPropsDebounced.current(items);
                currentEdit.current = {
                    showRemoveButton: props.showRemoveButton,
                    showResizeHandles: props.showResizeHandles,
                };
            } else if (
                !_.isEqual(
                    stripItems(previousItems.current),
                    stripItems(items)
                ) ||
                !_.isEqual(itemLayout || [], layoutItemsRef.current)
            ) {
                updateItemsFromPropsDebounced.current(items);
                previousItems.current = items;
            }
            layoutItemsRef.current = itemLayout;
        }
    }, [
        items,
        itemLayout,
        init,
        props.showRemoveButton,
        props.showResizeHandles,
    ]);

    const onLayoutChange = _.debounce((layout) => {
        if (init) {
            if (findCurrentBreakpoint() === 'lg') {
                const newItems = [...layoutItems].map((item) => {
                    const newItem = layout.filter((i) => i.i === item.i)[0];
                    return {...item, ...newItem};
                });
                updateDashLayoutDebounced(newItems);
            }
            if (setProps) {
                if (!_.isEqual(props.currentLayout, layout)) {
                    setTimeout(() => setProps({currentLayout: layout}), 1);
                }
            }
        }
        // eslint-disable-next-line no-magic-numbers
    }, 100);

    const onBreakpointChange = _.debounce((newBreakpoint, newCols) => {
        if (setProps) {
            setProps({breakpointData: {newBreakpoint, newCols}});
        }
        // eslint-disable-next-line no-magic-numbers
    }, 100);

    return (
        <div id={props.id} style={props.style} ref={gridLayoutRef}>
            <ResponsiveReactGridLayout
                maxRows = {props.maxRows}
                autoSize={props.autoSize}
                //                onLayoutChange={layoutGridOnly}
                onDragStop={onLayoutChange}
                onResizeStop={onLayoutChange}
                //                layouts={{lg: currentLayout}}
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
                margin={props.margin}
                allowOverlap={props.allowOverlap}
            >
                {gridLayout}
            </ResponsiveReactGridLayout>
        </div>
    );
};

DashGridLayout.defaultProps = {
    allowOverlap: false,
    margin: [10, 10],
    autoSize: true,
    maxRows: Infinity,
    className: 'layout',
    rowHeight: 100,
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},
    compactType: 'vertical',
    showRemoveButton: true,
    showResizeHandles: true,
    currentLayout: [],
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    items: [],
    itemLayout: [],
    itemToRemove: '',
    draggableChildStyle: {
        padding: '10px',
        overflow: 'hidden',
        maxHeight: '95%',
        maxWidth: '100%',
      },
};

DashGridLayout.propTypes = {
    /**
     * If true, the container height swells and contracts to fit contents.
     */
    maxRows: PropTypes.number,
    /**
     * Prevents dragging items outside the container.
     */
    autoSize: PropTypes.bool,  
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

    /**
     * The item in the grid that should be removed when triggered
     */
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
        }),
    
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
    /**
     * Margin between grid items, in pixels. Can be a fixed array like [10, 10],
     * or responsive like {lg: [10, 10], md: [8, 8], ...}
     */
    margin: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.object
    ]),
    /** 
    *If true, grid can be placed one over the other.
    *If set, implies `preventCollision`.
    */
    allowOverlap: PropTypes.bool, 
    /** 
     * Style of the draggable element when in layout edit mode.
    */
    draggableChildStyle: PropTypes.object,

};

export default DashGridLayout;
