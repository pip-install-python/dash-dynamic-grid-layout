import dash_dynamic_grid_layout as dgl
from dash import Dash, html, dcc, callback
from dash.dependencies import Input, Output, State
from dash.exceptions import PreventUpdate
import plotly.express as px
import dash_leaflet as dl
import dash_mantine_components as dmc
from dash_iconify import DashIconify
from datetime import datetime, date

app = Dash(__name__)

# Sample data for the graph
df = px.data.iris()

app.layout = html.Div([
    dmc.Menu(
        [
            dmc.MenuTarget(dmc.ActionIcon(
                DashIconify(icon="icon-park:add-web", width=20),
                size="lg",
                color="#fff",
                variant="filled",
                id="action-icon",
                n_clicks=0,
                mb=8,
                style={"backgroundColor": "#fff"},
            )),
            dmc.MenuDropdown(
                [
                    dmc.MenuItem("Add Dynamic Component", id="add-dynamic-component", n_clicks=0),
                    dmc.MenuItem("Edit Dynamic Layout", id="edit-mode", n_clicks=0),
                ]
            ),
        ],
        transitionProps={"transition": "rotate-right", "duration": 150, },
        position='right'
    ),
    dgl.DashGridLayout(
        id='grid-layout',
        children=[
            dgl.DraggableWrapper(
                children=[
                    dl.Map(dl.TileLayer(), center=[56, 10], zoom=6, style={'height': '100vh', 'width': '100vw',}),
                ],
                id='draggable-map-1'
            ),
            dgl.DraggableWrapper(
                html.Img(src='https://picsum.photos/200/300', style={'width': '100%', 'height': '100%', 'objectFit': 'cover'}),
                id='draggable-map-2'
            ),
            dgl.DraggableWrapper(
                dcc.Graph(
                    id='example-graph',
                    figure=px.scatter(df, x="sepal_width", y="sepal_length", color="species"),
                    style={'height': '100%'}
                ),
                id='draggable-map-3'
            ),
            dgl.DraggableWrapper(
                dmc.ColorPicker(id="qr-color-picker", format="rgba", value="rgba(0, 0, 0, 1)", fullWidth=True),
            ),
            dgl.DraggableWrapper(
                dmc.DatePickerInput(
                    id="date-picker-input",
                    label="Start Date",
                    description="You can also provide a description",
                    minDate=date(2020, 8, 5),
                    value=datetime.now().date(),  # or string in the format "YYYY-MM-DD"
                    style={"width": 200},
                )
            )
        ],
        newItemTemplate=dgl.DraggableWrapper(
            dcc.Graph(
                figure=px.scatter(df, x="petal_width", y="petal_length", color="species"),
                style={'height': '100%'}
            )
        ),
        showRemoveButton=False,
        showResizeHandles=False,
        rowHeight=150,
        cols={'lg': 12, 'md': 10, 'sm': 6, 'xs': 4, 'xxs': 2},
        style={'height': '800px'},
        compactType='horizontal',
    ),
    html.Div(id='layout-output'),
    dcc.Store(id='layout-store')
])

@callback(
    Output('layout-store', 'data'),
    Input('grid-layout', 'currentLayout')
)
def store_layout(current_layout):
    return current_layout

@callback(
    Output('grid-layout', 'showRemoveButton'),
    Output('grid-layout', 'showResizeHandles'),
    Output('draggable-map-1', 'handleBackground'),
    Input('edit-mode', 'n_clicks'),
    State('grid-layout', 'showRemoveButton'),
    State('grid-layout', 'showResizeHandles'),
    prevent_initial_call=True
)
def enter_editable_mode(n_clicks, current_remove, current_resize):
    print("Edit mode clicked:", n_clicks)  # Debug print
    if n_clicks is None:
        raise PreventUpdate
    return not current_remove, not current_resize, 'rgba(255, 255, 255, 0.7)'

@callback(
    Output('layout-output', 'children'),
    Input('layout-store', 'data')
)
def display_layout(current_layout):
    print("Current Layout:", current_layout)  # Debug print
    if current_layout and isinstance(current_layout, list):
        layout_str = "Displayed as [x, y, w, h]:\n"
        for i, item in enumerate(current_layout):
            layout_str += f"{i}: [{item['x']}, {item['y']}, {item['w']}, {item['h']}]\n"
        return html.Pre(layout_str)
    return "No layout data available"

@callback(
    Output('grid-layout', 'addItem'),
    Input('add-dynamic-component', 'n_clicks'),
    prevent_initial_call=True
)
def add_dynamic_component(n_clicks):
    if n_clicks is None:
        raise PreventUpdate
    return True

if __name__ == '__main__':
    app.run_server(debug=True)