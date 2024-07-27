# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DashGridCol(Component):
    """A DashGridCol component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; required)

- size (list of numbers; required)"""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_dynamic_grid_layout'
    _type = 'DashGridCol'
    @_explicitize_args
    def __init__(self, children=None, size=Component.REQUIRED, **kwargs):
        self._prop_names = ['children', 'size']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'size']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        for k in ['size']:
            if k not in args:
                raise TypeError(
                    'Required argument `' + k + '` was not specified.')

        if 'children' not in _explicit_args:
            raise TypeError('Required argument children was not specified.')

        super(DashGridCol, self).__init__(children=children, **args)
