# AUTO GENERATED FILE - DO NOT EDIT

export dashgridlayout

"""
    dashgridlayout(;kwargs...)

A DashGridLayout component.

Keyword arguments:
- `id` (String; optional)
- `addItem` (Bool; optional)
- `breakpointData` (optional): . breakpointData has the following type: lists containing elements 'newBreakpoint', 'newCols'.
Those elements have the following types:
  - `newBreakpoint` (String; optional)
  - `newCols` (Real; optional)
- `breakpoints` (optional): . breakpoints has the following type: lists containing elements 'lg', 'md', 'sm', 'xs', 'xxs'.
Those elements have the following types:
  - `lg` (Real; optional)
  - `md` (Real; optional)
  - `sm` (Real; optional)
  - `xs` (Real; optional)
  - `xxs` (Real; optional)
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
- `itemLayout` (optional): . itemLayout has the following type: Array of lists containing elements 'i', 'x', 'y', 'w', 'h'.
Those elements have the following types:
  - `i` (String; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `w` (Real; optional)
  - `h` (Real; optional)s
- `items` (Array of a list of or a singular dash component, string or numbers; optional)
- `persisted_props` (Array; optional)
- `persistence` (Bool; optional)
- `persistence_type` (a value equal to: 'local', 'memory', 'session'; optional)
- `rowHeight` (Real; optional)
- `showRemoveButton` (Bool; optional)
- `showResizeHandles` (Bool; optional)
- `style` (Dict; optional)
"""
function dashgridlayout(; kwargs...)
        available_props = Symbol[:id, :addItem, :breakpointData, :breakpoints, :className, :cols, :compactType, :currentLayout, :itemCount, :itemLayout, :items, :persisted_props, :persistence, :persistence_type, :rowHeight, :showRemoveButton, :showResizeHandles, :style]
        wild_props = Symbol[]
        return Component("dashgridlayout", "DashGridLayout", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

