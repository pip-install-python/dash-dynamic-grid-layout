# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashGridLayout(Component):
    """A DashGridLayout component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional)

- id (string; optional)

- allowAddItem (boolean; default True)

- className (string; default "layout")

- cols (dict; default { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 })

- compactType (a value equal to: 'vertical', 'horizontal', null; default 'vertical')

- itemCount (number; optional)

- newItemTemplate (a list of or a singular dash component, string or number; optional)

- rowHeight (number; default 100)

- style (dict; optional)"""
    _children_props = ['newItemTemplate']
    _base_nodes = ['newItemTemplate', 'children']
    _namespace = 'dash_dynamic_grid_layout'
    _type = 'DashGridLayout'
    @_explicitize_args
    def __init__(self, children=None, id=Component.UNDEFINED, onLayoutChange=Component.UNDEFINED, newItemTemplate=Component.UNDEFINED, className=Component.UNDEFINED, rowHeight=Component.UNDEFINED, cols=Component.UNDEFINED, style=Component.UNDEFINED, itemCount=Component.UNDEFINED, allowAddItem=Component.UNDEFINED, compactType=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'allowAddItem', 'className', 'cols', 'compactType', 'itemCount', 'newItemTemplate', 'rowHeight', 'style']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'allowAddItem', 'className', 'cols', 'compactType', 'itemCount', 'newItemTemplate', 'rowHeight', 'style']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        super(DashGridLayout, self).__init__(children=children, **args)
