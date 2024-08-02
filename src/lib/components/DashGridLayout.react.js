import React, { useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './DashGridLayout.css';
import DraggableWrapper from './DraggableWrapper.react';
import _ from 'lodash'

// eslint-disable-next-line new-cap
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const DashGridLayout = ({ setProps, ...props }) => {

    const [layoutItems, setItems] = useState([]);
    const [newCounter, setNewCounter] = useState(0);
    const [currentLayout, setCurrentLayout] = useState([]);
    const [breakpointData, setBreakpointData] = useState({});
    const [breakpoints, setBreakpoints] = useState({lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0})
    const gridLayoutRef = useRef(null)
    const [init, setInit] = useState(false)
    const layoutItemsRef = useRef([])
    const systemUpdateItems = useRef(null)
    const setPropsRef = useRef(null)
    const updateDashLayout = useRef(null)

    const findCurrentBreakpoint = (init = false) => {
        const currentWidth = gridLayoutRef.current.clientWidth;
        if (init) {
            // eslint-disable-next-line no-use-before-define
            const breakpoints = {...breakpoints, ...props.breakpoints}
            setBreakpoints(breakpoints)
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
        return currentBreakpoint
    }

    const convertPropsToLayout = (items) => {
        const newItems = [...items].map((item, i) => {
                return {...{
                        i: item.key,
                        // eslint-disable-next-line no-magic-numbers
                        x: i * 2 % 12,
                        // eslint-disable-next-line no-magic-numbers
                        y: Math.floor(i / 6) * 2,
                        w: 2,
                        h: 2,
                        content: item,
                    }, ...props.itemLayout.filter((i) => i.i === item.key)[0]

                }
        })
        return newItems
    }

    // initial call
    useEffect(() => {
        setPropsRef.current = _.debounce((props) => {
            setProps(props)
            // eslint-disable-next-line no-magic-numbers
        }, 50)
        updateDashLayout.current = _.debounce((layoutItems) => {
            const propsToSet = {itemCount: layoutItems.length}
            if (!_.isEmpty(layoutItems)) {
                const newLayoutItems = layoutItems.map((item) => {
                    return _.omit(item, ['content'])
                })
                if (!_.isEqual(newLayoutItems, props.itemLayout)) {
                    propsToSet.itemLayout = newLayoutItems
                    systemUpdateItems.current = true
                }
                layoutItemsRef.current = newLayoutItems
            }
            setPropsRef.current(propsToSet);
            // eslint-disable-next-line no-magic-numbers
        }, 50)
        setCurrentLayout(props.currentLayout || layoutItems.map(({ i, x, y, w, h }) => ({ i, x, y, w, h })))
        const newItems = convertPropsToLayout(props.items)
        setItems(newItems)
        setNewCounter(props.items.length)
        // get initial screen size
        setBreakpointData({newBreakpoint: findCurrentBreakpoint(true)})
        setInit(true)
    }, [])

    useEffect(() => {
        if (updateDashLayout.current) {
            updateDashLayout.current(layoutItems)
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
            updateItemsFromPropsDebounced()
        }
    }, [props.items, props.itemLayout])

    useEffect(() => {
        if (props.addItem) {
            // eslint-disable-next-line no-use-before-define
            onAddItem();
        }
    }, [props.addItem]);

    const onLayoutChange = _.debounce((layout) => {
        if (findCurrentBreakpoint() === 'lg') {
            const newItems = [...layoutItems].map((item) => {
                const newItem = layout.filter(i => i.i === item.i)[0]
                return {...item, ...newItem}
            })
            setTimeout(() => setItems(newItems), 1)
        }
        if (setProps.current) {
            setProps.current({ currentLayout: layout });
        }
        // eslint-disable-next-line no-magic-numbers
    }, 5)

    const onBreakpointChange = _.debounce((newBreakpoint, newCols) => {
        setBreakpointData({newBreakpoint, newCols})
        setProps({breakpointData: {newBreakpoint, newCols}})
        // eslint-disable-next-line no-magic-numbers
    }, 5)

    const onAddItem = () => {
        const newItem = {
            i: `n${newCounter}`,
            // eslint-disable-next-line no-magic-numbers
            x: 0,
            y: 0,
            w: 2,
            h: 2,
        };
        const newItems = [...layoutItems, newItem];
        setItems(newItems);
        setNewCounter(newCounter + 1);

        if (setProps) {
            setProps({addItem: false });
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
        if (_.get(content, ['type']) === DraggableWrapper) {
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
        <div id={props.id} style={props.style} ref={gridLayoutRef}>
            <ResponsiveReactGridLayout
                onLayoutChange={onLayoutChange}
                layouts={{ lg: currentLayout }}
                resizeHandles={props.showResizeHandles ? ['s', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'] : []}
                draggableHandle=".react-grid-dragHandle"
                isResizable={props.showResizeHandles}
                onBreakpointChange={onBreakpointChange}
                {..._.omit(props, ['items'])}
                breakpoints={breakpoints}
            >
                {layoutItems.map(createElement)}
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
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    items: [],
    itemLayout: [],
    persisted_props: ['items', 'itemLayout'],
    persistence_type: 'local',
};

DashGridLayout.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    rowHeight: PropTypes.number,
    cols: PropTypes.object,
    style: PropTypes.object,
    itemCount: PropTypes.number,
    addItem: PropTypes.bool,
    compactType: PropTypes.oneOf(['vertical', 'horizontal', null]),
    showRemoveButton: PropTypes.bool,
    showResizeHandles: PropTypes.bool,
    persistence: PropTypes.bool,
    persisted_props: PropTypes.array,
    persistence_type: PropTypes.oneOf(['local', 'memory', 'session']),
    items: PropTypes.arrayOf(PropTypes.node),
    itemLayout: PropTypes.arrayOf(PropTypes.shape({
        i: PropTypes.string,
        x: PropTypes.number,
        y: PropTypes.number,
        w: PropTypes.number,
        h: PropTypes.number,
    })),
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