import dash_dynamic_grid_layout as dgl
from dash import *
from dash.exceptions import PreventUpdate
import plotly.express as px
import dash_leaflet as dl
import dash_mantine_components as dmc
from dash_iconify import DashIconify
from datetime import datetime, date
import json
import random
import string

dash._dash_renderer._set_react_version("18.2.0")

app = Dash(__name__)

# Sample data for the graph
df = px.data.iris()

# Create a Random String ID for the new component
def generate_random_string(length):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits
    # Generate a random string
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string


app.layout = dmc.MantineProvider(
    [
        html.Div(
            [
                dmc.Menu(
                    [
                        dmc.MenuTarget(
                            dmc.ActionIcon(
                                DashIconify(icon="icon-park:add-web", width=20),
                                size="lg",
                                color="#fff",
                                variant="filled",
                                id="action-icon",
                                n_clicks=0,
                                mb=8,
                                style={"backgroundColor": "#fff"},
                            )
                        ),
                        dmc.MenuDropdown(
                            [
                                dmc.MenuItem(
                                    "Add Dynamic Component",
                                    id="add-dynamic-component",
                                    n_clicks=0,
                                ),
                                dmc.MenuItem(
                                    "Edit Dynamic Layout", id="edit-mode", n_clicks=0
                                ),
                            ]
                        ),
                    ],
                    transitionProps={
                        "transition": "rotate-right",
                        "duration": 150,
                    },
                    position="right",
                ),
                dgl.DashGridLayout(
                    id="grid-layout",
                    items=[
                        dgl.DraggableWrapper(
                            children=[
                                dl.Map(
                                    dl.TileLayer(),
                                    center=[56, 10],
                                    zoom=6,
                                    style={
                                        "height": "100vh",
                                        "width": "100vw",
                                    },
                                ),
                            ],
                            id="draggable-map-1",
                            handleBackground="rgb(85,85,85) !important;",
                        ),
                        dgl.DraggableWrapper(
                            html.Img(
                                src="https://picsum.photos/200/300",
                                style={
                                    "width": "100%",
                                    "height": "100%",
                                    "objectFit": "cover",
                                },
                            ),
                            id="draggable-map-2",
                        ),
                        dgl.DraggableWrapper(
                            dcc.Graph(
                                id="example-graph",
                                figure=px.scatter(
                                    df,
                                    x="sepal_width",
                                    y="sepal_length",
                                    color="species",
                                ),
                                style={"height": "100%"},
                            ),
                            id="draggable-map-3",
                        ),
                        dgl.DraggableWrapper(
                            dmc.ColorPicker(
                                id="qr-color-picker",
                                format="rgba",
                                value="rgba(0, 0, 0, 1)",
                                fullWidth=True,
                            ),
                        ),
                        dgl.DraggableWrapper(
                            dmc.DatePicker(
                                id="date-picker-input",
                                label="Start Date",
                                description="You can also provide a description",
                                minDate=date(2020, 8, 5),
                                value=datetime.now().date(),  # or string in the format "YYYY-MM-DD"
                                w=250,
                            )
                        ),
                    ],
                    showRemoveButton=False,
                    showResizeHandles=False,
                    rowHeight=150,
                    cols={"lg": 12, "md": 10, "sm": 6, "xs": 4, "xxs": 2},
                    style={"height": "800px"},
                    compactType="horizontal",
                    persistence=True
                ),
                html.Div(id="layout-output"),
                dcc.Store(id="layout-store"),
            ]
        )
    ],
    id="mantine-provider",
    forceColorScheme="light",
)


@callback(Output("layout-store", "data"), Input("grid-layout", "currentLayout"))
def store_layout(current_layout):
    return current_layout


@callback(
    Output("grid-layout", "showRemoveButton"),
    Output("grid-layout", "showResizeHandles"),
    Output("draggable-map-1", "handleBackground"),
    Input("edit-mode", "n_clicks"),
    State("grid-layout", "showRemoveButton"),
    State("grid-layout", "showResizeHandles"),
    prevent_initial_call=True,
)
def enter_editable_mode(n_clicks, current_remove, current_resize):
    print("Edit mode clicked:", n_clicks)  # Debug print
    if n_clicks is None:
        raise PreventUpdate
    return not current_remove, not current_resize, "rgba(255, 255, 255, 0.7)"


@callback(Output("layout-output", "children"), Input("grid-layout", "items"))
def display_layout(current_layout):
    if current_layout and isinstance(current_layout, list):
        return html.Div(json.dumps(current_layout))
    return "No layout data available"


@callback(
    Output("grid-layout", "items"),
    Output("grid-layout", "itemLayout"),
    Input("add-dynamic-component", "n_clicks"),
    prevent_initial_call=True,
)
def add_dynamic_component(n):
    if n:
        items = Patch()
        new_id = generate_random_string(10)
        items.append(dgl.DraggableWrapper(
                        dcc.Graph(
                            figure=px.scatter(
                                df, x="petal_width", y="petal_length", color="species"
                            ),
                            style={"height": "100%"},
                        ),
                        id=f'{new_id}'
                    ))
        itemLayout = Patch()
        itemLayout.append({'i': f'{new_id}', 'w': 6})
        return items, itemLayout
    return no_update, no_update


if __name__ == "__main__":
    app.run_server(debug=True, port=8321)