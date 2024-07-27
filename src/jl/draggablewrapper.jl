# AUTO GENERATED FILE - DO NOT EDIT

export draggablewrapper

"""
    draggablewrapper(;kwargs...)
    draggablewrapper(children::Any;kwargs...)
    draggablewrapper(children_maker::Function;kwargs...)


A DraggableWrapper component.

Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional)
"""
function draggablewrapper(; kwargs...)
        available_props = Symbol[:children]
        wild_props = Symbol[]
        return Component("draggablewrapper", "DraggableWrapper", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

draggablewrapper(children::Any; kwargs...) = draggablewrapper(;kwargs..., children = children)
draggablewrapper(children_maker::Function; kwargs...) = draggablewrapper(children_maker(); kwargs...)

