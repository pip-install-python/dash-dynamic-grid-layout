# AUTO GENERATED FILE - DO NOT EDIT

export draggablewrapper

"""
    draggablewrapper(;kwargs...)
    draggablewrapper(children::Any;kwargs...)
    draggablewrapper(children_maker::Function;kwargs...)


A DraggableWrapper component.
DashGridLayout is a flexible grid layout system for arranging and moving components within a Dash application.
It leverages the react-grid-layout library to provide responsive and draggable grid items.
Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional): The content to be wrapped and made draggable.
- `id` (String; optional): A unique identifier for the DraggableWrapper component.
- `handleBackground` (String; optional): The background color of the drag handle.
- `handleColor` (String; optional): The text color of the drag handle.
- `handleText` (String; optional): The text to display in the drag handle.
"""
function draggablewrapper(; kwargs...)
        available_props = Symbol[:children, :id, :handleBackground, :handleColor, :handleText]
        wild_props = Symbol[]
        return Component("draggablewrapper", "DraggableWrapper", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

draggablewrapper(children::Any; kwargs...) = draggablewrapper(;kwargs..., children = children)
draggablewrapper(children_maker::Function; kwargs...) = draggablewrapper(children_maker(); kwargs...)

