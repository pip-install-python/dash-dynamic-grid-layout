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
- `addItem` (Bool; optional)
- `className` (String; optional)
- `cols` (Dict; optional)
- `compactType` (a value equal to: 'vertical', 'horizontal', null; optional)
- `currentLayout` (optional): . currentLayout has the following type: Array of lists containing elements 'i', 'x', 'y', 'w', 'h'.
Those elements have the following types:
  - `i` (String; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `w` (Real; optional)
  - `h` (Real; optional)s
- `itemCount` (Real; optional)
- `newItemTemplate` (a list of or a singular dash component, string or number; optional)
- `rowHeight` (Real; optional)
- `showRemoveButton` (Bool; optional)
- `showResizeHandles` (Bool; optional)
- `style` (Dict; optional)
"""
function dashgridlayout(; kwargs...)
        available_props = Symbol[:children, :id, :addItem, :className, :cols, :compactType, :currentLayout, :itemCount, :newItemTemplate, :rowHeight, :showRemoveButton, :showResizeHandles, :style]
        wild_props = Symbol[]
        return Component("dashgridlayout", "DashGridLayout", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

dashgridlayout(children::Any; kwargs...) = dashgridlayout(;kwargs..., children = children)
dashgridlayout(children_maker::Function; kwargs...) = dashgridlayout(children_maker(); kwargs...)

