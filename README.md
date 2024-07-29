# Dash Dynamic Grid Layout

Dash Dynamic Grid Layout is a Dash component library that provides a flexible grid layout system for arranging and moving components within a Dash application.

![Dynamic Grid Example](https://i.imgur.com/BADjL7L.gif)

## Features

- Drag-and-drop functionality for rearranging components
- Resizable grid items
- Customizable layout with responsive breakpoints
- Option to add or remove items dynamically
- Customizable drag handles for each item

### Installation

```bash
pip install dash-dynamic-grid-layout
```

### Usage
Here's a basic example of how to use the DashGridLayout component:

```python
import dash_dynamic_grid_layout as dgl
from dash import Dash, html, dcc
import plotly.express as px

app = Dash(__name__)

df = px.data.iris()

app.layout = html.Div([
    dgl.DashGridLayout(
        id='grid-layout',
        children=[
            dgl.DraggableWrapper(
                children=[
                    html.Div('Drag me!', style={'height': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'border': '1px solid #ddd', 'borderRadius': '5px'})
                ],
                handleText='Move'
            ),
            dgl.DraggableWrapper(
                children=[
                    dcc.Graph(
                        figure=px.scatter(df, x="sepal_width", y="sepal_length", color="species"),
                        style={'height': '100%'}
                    )
                ],
                handleText='Move Graph'
            )
        ],
        rowHeight=150,
        cols={'lg': 12, 'md': 10, 'sm': 6, 'xs': 4, 'xxs': 2},
        style={'height': '600px'},
    )
])

if __name__ == '__main__':
    app.run_server(debug=True)
```

## Prop Reference
### DashGridLayout

| Property         | Type   | Default | Description                                                   |
|------------------|--------|---------|---------------------------------------------------------------|
| id               | string | -       | The ID used to identify this component in Dash callbacks      |
| children         | list   | -       | A list of dash components to be rendered in the grid          |
| currentLayout    | list   | []      | The current layout of the grid items                          |
| rowHeight        | number | 100     | The height of a single row in pixels                          |
| cols             | dict   | { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } | An object containing breakpoints and column numbers |
| compactType      | string | 'vertical' | Compaction type. Can be 'vertical', 'horizontal', or null |
| showRemoveButton | bool   | True    | Whether to show remove buttons for grid items                 |
| showResizeHandles| bool   | True    | Whether to show resize handles for grid items                 |

### DraggableWrapper

| Property         | Type   | Default       | Description                                      |
|------------------|--------|---------------|--------------------------------------------------|
| children         | node   | -             | The content to be wrapped and made draggable     |
| handleBackground | string | "rgb(85,85,85)"| Background color of the drag handle              |
| handleColor      | string | "white"       | Text color of the drag handle                    |
| handleText       | string | "Drag here"   | Text to display in the drag handle               |
### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
### License
This project is licensed under the MIT License.
