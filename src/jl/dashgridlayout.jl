# AUTO GENERATED FILE - DO NOT EDIT

export dashgridlayout

"""
    dashgridlayout(;kwargs...)
    dashgridlayout(children::Any;kwargs...)
    dashgridlayout(children_maker::Function;kwargs...)


A DashGridLayout component.

Keyword arguments:
- `children` (a list of or a singular dash component, string or number; optional)
- `id` (String; optional)
- `allowAddItem` (Bool; optional)
- `className` (String; optional)
- `cols` (Dict; optional)
- `compactType` (a value equal to: 'vertical', 'horizontal', null; optional)
- `itemCount` (Real; optional)
- `newItemTemplate` (a list of or a singular dash component, string or number; optional)
- `rowHeight` (Real; optional)
- `style` (Dict; optional)
"""
function dashgridlayout(; kwargs...)
        available_props = Symbol[:children, :id, :allowAddItem, :className, :cols, :compactType, :itemCount, :newItemTemplate, :rowHeight, :style]
        wild_props = Symbol[]
        return Component("dashgridlayout", "DashGridLayout", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

dashgridlayout(children::Any; kwargs...) = dashgridlayout(;kwargs..., children = children)
dashgridlayout(children_maker::Function; kwargs...) = dashgridlayout(children_maker(); kwargs...)

