# AUTO GENERATED FILE - DO NOT EDIT

from dash.development.base_component import Component, _explicitize_args


class DraggableWrapper(Component):
    """A DraggableWrapper component.


Keyword arguments:

- children (a list of or a singular dash component, string or number; optional):
    The content to be wrapped and made draggable.

- id (string; optional):
    A unique identifier for the DraggableWrapper component.

- handleBackground (string; default "rgb(85,85,85)"):
    The background color of the drag handle.

- handleColor (string; default "white"):
    The text color of the drag handle.

- handleText (string; default "Drag here"):
    The text to display in the drag handle."""
    _children_props = []
    _base_nodes = ['children']
    _namespace = 'dash_dynamic_grid_layout'
    _type = 'DraggableWrapper'
    @_explicitize_args
    def __init__(self, children=None, handleBackground=Component.UNDEFINED, handleColor=Component.UNDEFINED, handleText=Component.UNDEFINED, id=Component.UNDEFINED, **kwargs):
        self._prop_names = ['children', 'id', 'handleBackground', 'handleColor', 'handleText']
        self._valid_wildcard_attributes =            []
        self.available_properties = ['children', 'id', 'handleBackground', 'handleColor', 'handleText']
        self.available_wildcard_properties =            []
        _explicit_args = kwargs.pop('_explicit_args')
        _locals = locals()
        _locals.update(kwargs)  # For wildcard attrs and excess named props
        args = {k: _locals[k] for k in _explicit_args if k != 'children'}

        super(DraggableWrapper, self).__init__(children=children, **args)
