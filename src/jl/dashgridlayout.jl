# AUTO GENERATED FILE - DO NOT EDIT

export dashgridlayout

"""
    dashgridlayout(;kwargs...)

A DashGridLayout component.
DashGridLayout is a flexible grid layout system for arranging and moving components within a Dash application.
It leverages the react-grid-layout library to provide responsive and draggable grid items.
Keyword arguments:
- `id` (String; optional): The ID used to identify this component in Dash callbacks.
- `breakpointData` (optional): Data about the current breakpoint and columns.. breakpointData has the following type: lists containing elements 'newBreakpoint', 'newCols'.
Those elements have the following types:
  - `newBreakpoint` (String; optional)
  - `newCols` (Real; optional)
- `breakpoints` (optional): Breakpoints for responsive layout.. breakpoints has the following type: lists containing elements 'lg', 'md', 'sm', 'xs', 'xxs'.
Those elements have the following types:
  - `lg` (Real; optional)
  - `md` (Real; optional)
  - `sm` (Real; optional)
  - `xs` (Real; optional)
  - `xxs` (Real; optional)
- `className` (String; optional): CSS class name for the grid layout.
- `cols` (Dict; optional): An object containing breakpoints and column numbers.
- `compactType` (a value equal to: 'vertical', 'horizontal', null; optional): Compaction type. Can be 'vertical', 'horizontal', or null.
- `currentLayout` (optional): The current layout of the grid items.. currentLayout has the following type: Array of lists containing elements 'i', 'x', 'y', 'w', 'h'.
Those elements have the following types:
  - `i` (String; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `w` (Real; optional)
  - `h` (Real; optional)s
- `itemCount` (Real; optional): The number of items in the grid.
- `itemLayout` (optional): Layout configuration for each item.. itemLayout has the following type: Array of lists containing elements 'i', 'x', 'y', 'w', 'h'.
Those elements have the following types:
  - `i` (String; optional)
  - `x` (Real; optional)
  - `y` (Real; optional)
  - `w` (Real; optional)
  - `h` (Real; optional)s
- `itemToRemove` (Bool | Real | String | Dict | Array; optional): The item in the grid that should be removed when triggered
- `items` (Array of a list of or a singular dash component, string or numbers; optional): List of items to be rendered in the grid.
- `persisted_props` (Array; optional): List of props to persist.
- `persistence` (Bool; optional): Whether to persist the component's state.
- `persistence_type` (a value equal to: 'local', 'memory', 'session'; optional): Type of persistence ('local', 'memory', 'session').
- `rowHeight` (Real; optional): The height of a single row in pixels.
- `showRemoveButton` (Bool; optional): Whether to show remove buttons for grid items.
- `showResizeHandles` (Bool; optional): Whether to show resize handles for grid items.
- `style` (Dict; optional): Inline styles for the grid layout.
"""
function dashgridlayout(; kwargs...)
        available_props = Symbol[:id, :breakpointData, :breakpoints, :className, :cols, :compactType, :currentLayout, :itemCount, :itemLayout, :itemToRemove, :items, :persisted_props, :persistence, :persistence_type, :rowHeight, :showRemoveButton, :showResizeHandles, :style]
        wild_props = Symbol[]
        return Component("dashgridlayout", "DashGridLayout", "dash_dynamic_grid_layout", available_props, wild_props; kwargs...)
end

