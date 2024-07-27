# AUTO GENERATED FILE - DO NOT EDIT

export dashgridcol

"""
    dashgridcol(;kwargs...)
    dashgridcol(children::Any;kwargs...)
    dashgridcol(children_maker::Function;kwargs...)


A DashGridCol component.

Keyword arguments:
- `children` (a list of or a singular dash component, string or number; required)
- `size` (Array of Reals; required)
"""
function dashgridcol(; kwargs...)
        available_props = Symbol[:children, :size]
        wild_props = Symbol[]
        return Component("dashgridcol", "DashGridCol", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

dashgridcol(children::Any; kwargs...) = dashgridcol(;kwargs..., children = children)
dashgridcol(children_maker::Function; kwargs...) = dashgridcol(children_maker(); kwargs...)

