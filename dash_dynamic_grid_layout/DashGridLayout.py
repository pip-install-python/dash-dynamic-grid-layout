# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashGridLayout(Component):
    """A DashGridLayout component.


Keyword arguments:

- id (string; optional)

- addItem (boolean; default False)

- breakpointData (dict; optional)

    `breakpointData` is a dict with keys:

    - newBreakpoint (string; optional)

    - newCols (number; optional)

- breakpoints (dict; default {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0})

    `breakpoints` is a dict with keys:

    - lg (number; optional)

    - md (number; optional)

    - sm (number; optional)

    - xs (number; optional)

    - xxs (number; optional)

- className (string; default "layout")

- cols (dict; default { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 })

- compactType (a value equal to: 'vertical', 'horizontal', null; default 'vertical')

- currentLayout (list of dicts; optional)

    `currentLayout` is a list of dicts with keys:

    - h (number; optional)

    - i (string; optional)

    - w (number; optional)

    - x (number; optional)

    - y (number; optional)

- itemCount (number; optional)

- itemLayout (list of dicts; optional)

    `itemLayout` is a list of dicts with keys:

    - h (number; optional)

    - i (string; optional)

    - w (number; optional)

    - x (number; optional)

    - y (number; optional)

- items (list of a list of or a singular dash component, string or numbers; optional)

- persisted_props (list; default ['items', 'itemLayout'])

- persistence (boolean; optional)

- persistence_type (a value equal to: 'local', 'memory', 'session'; default 'local')

- rowHeight (number; default 100)

- showRemoveButton (boolean; default True)

- showResizeHandles (boolean; default True)

- style (dict; optional)"""
    _children_props = ['items']
    _base_nodes = ['items', 'children']
    _namespace = 'dash_dynamic_grid_layout'
    _type = 'DashGridLayout'
    @_explicitize_args
    def __init__(self, id=Component.UNDEFINED, className=Component.UNDEFINED, rowHeight=Component.UNDEFINED, cols=Component.UNDEFINED, style=Component.UNDEFINED, itemCount=Component.UNDEFINED, addItem=Component.UNDEFINED, compactType=Component.UNDEFINED, showRemoveButton=Component.UNDEFINED, showResizeHandles=Component.UNDEFINED, persistence=Component.UNDEFINED, persisted_props=Component.UNDEFINED, persistence_type=Component.UNDEFINED, items=Component.UNDEFINED, itemLayout=Component.UNDEFINED, currentLayout=Component.UNDEFINED, breakpointData=Component.UNDEFINED, breakpoints=Component.UNDEFINED, **kwargs):
        self._prop_names = ['id', 'addItem', 'breakpointData', 'breakpoints', 'className', 'cols', 'compactType', 'currentLayout', 'itemCount', 'itemLayout', 'items', 'persisted_props', 'persistence', 'persistence_type', 'rowHeight', 'showRemoveButton', 'showResizeHandles', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['id', 'addItem', 'breakpointData', 'breakpoints', 'className', 'cols', 'compactType', 'currentLayout', 'itemCount', 'itemLayout', 'items', 'persisted_props', 'persistence', 'persistence_type', 'rowHeight', 'showRemoveButton', 'showResizeHandles', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args}

        super(DashGridLayout, self).__init__(**args)
