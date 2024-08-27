% Auto-generated: do not edit by hand
\name{dashGridLayout}

\alias{dashGridLayout}

\title{DashGridLayout component}

\description{
DashGridLayout is a flexible grid layout system for arranging and moving components within a Dash application. It leverages the react-grid-layout library to provide responsive and draggable grid items.
}

\usage{
dashGridLayout(id=NULL, breakpointData=NULL, breakpoints=NULL,
className=NULL, cols=NULL, compactType=NULL,
currentLayout=NULL, itemCount=NULL, itemLayout=NULL,
itemToRemove=NULL, items=NULL, rowHeight=NULL,
showRemoveButton=NULL, showResizeHandles=NULL, style=NULL)
}

\arguments{
\item{id}{Character. The ID used to identify this component in Dash callbacks.}

\item{breakpointData}{Lists containing elements 'newbreakpoint', 'newcols'.
those elements have the following types:
  - newbreakpoint (character; optional)
  - newcols (numeric; optional). Data about the current breakpoint and columns.}

\item{breakpoints}{Lists containing elements 'lg', 'md', 'sm', 'xs', 'xxs'.
those elements have the following types:
  - lg (numeric; optional)
  - md (numeric; optional)
  - sm (numeric; optional)
  - xs (numeric; optional)
  - xxs (numeric; optional). Breakpoints for responsive layout.}

\item{className}{Character. CSS class name for the grid layout.}

\item{cols}{Named list. An object containing breakpoints and column numbers.}

\item{compactType}{A value equal to: 'vertical', 'horizontal', null. Compaction type. Can be 'vertical', 'horizontal', or null.}

\item{currentLayout}{List of lists containing elements 'i', 'x', 'y', 'w', 'h'.
those elements have the following types:
  - i (character; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - w (numeric; optional)
  - h (numeric; optional)s. The current layout of the grid items.}

\item{itemCount}{Numeric. The number of items in the grid.}

\item{itemLayout}{List of lists containing elements 'i', 'x', 'y', 'w', 'h'.
those elements have the following types:
  - i (character; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - w (numeric; optional)
  - h (numeric; optional)s. Layout configuration for each item.}

\item{itemToRemove}{Logical | numeric | character | named list | unnamed list. The item in the grid that should be removed when triggered}

\item{items}{List of a list of or a singular dash component, string or numbers. List of items to be rendered in the grid.}

\item{rowHeight}{Numeric. The height of a single row in pixels.}

\item{showRemoveButton}{Logical. Whether to show remove buttons for grid items.}

\item{showResizeHandles}{Logical. Whether to show resize handles for grid items.}

\item{style}{Named list. Inline styles for the grid layout.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

