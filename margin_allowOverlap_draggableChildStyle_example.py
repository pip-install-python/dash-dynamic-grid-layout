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
import full_calendar_component as fcc
from datetime import datetime

# Set the React version
dash._dash_renderer._set_react_version("18.2.0")

app = Dash(__name__)

# Get today's date
today = datetime.now()

# Format the date
formatted_date = today.strftime("%Y-%m-%d")

# Sample data for the graph
df = px.data.iris()


# Create a Random String ID for the new component
def generate_random_string(length):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits
    # Generate a random string
    random_string = "".join(random.choice(characters) for _ in range(length))
    return random_string


app.layout = dmc.MantineProvider(
    [
        html.Div(
            [
                html.Center(html.H4("json.dumps(current_layout)")),
                html.Hr(),
                html.Div(id="layout-output"),
                html.Hr(),
                dmc.Group([
                    html.H4("Add items or edit the layout ->"),
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
                    ]),
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
                            id="draggable-map",
                            handleBackground="rgb(85,85,85)",
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
                            id="draggable-image",
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
                            id="draggable-graph",
                        ),
                        dgl.DraggableWrapper(
                            dmc.ColorPicker(
                                id="qr-color-picker",
                                format="rgba",
                                value="rgba(0, 0, 0, 1)",
                                fullWidth=True,
                            ),
                            id="draggable-color-picker",
                        ),
                        dgl.DraggableWrapper(
                            fcc.FullCalendarComponent(
                                id="api_calendar",  # Unique ID for the component
                                initialView='dayGridMonth',  # dayGridMonth, timeGridWeek, timeGridDay, listWeek,
                                # dayGridWeek, dayGridYear, multiMonthYear, resourceTimeline, resourceTimeGridDay, resourceTimeLineWeek
                                headerToolbar={
                                    "left": "prev,next today",
                                    "center": "",
                                    "right": "",
                                },  # Calendar header
                                initialDate=f"{formatted_date}",  # Start date for calendar
                                editable=True,  # Allow events to be edited
                                selectable=True,  # Allow dates to be selected
                                events=[],
                                nowIndicator=True,  # Show current time indicator
                                navLinks=True,  # Allow navigation to other dates
                            ),
                            id="draggable-calendar"
                        ),
                    ],
                    itemLayout=[
                        # wrapper id, x(0-12), y, w(0-12), h(0-12)
                        {'i': 'draggable-map', 'x': 0, 'y': 0, 'w': 6, 'h': 4},
                        {'i': 'draggable-image', 'x': 4, 'y': 0, 'w': 4, 'h': 2},
                        {'i': 'draggable-graph', 'x': 0, 'y': 4, 'w': 6, 'h': 4},
                        {'i': 'draggable-color-picker', 'x': 6, 'y': 2, 'w': 3, 'h': 2},
                        {'i': 'draggable-calendar', 'x': 6, 'y': 4, 'w': 6, 'h': 4}
                    ],
                    showRemoveButton=False,
                    showResizeHandles=False,
                    rowHeight=150,
                    cols={"lg": 12, "md": 10, "sm": 6, "xs": 4, "xxs": 2},
                    style={"height": "1500px", 'backgroundColor': 'green'},
                    compactType=None,
                    autoSize = False,
                    maxRows = 40,
                    margin={"lg": [1, 1], "md": [1, 1], "sm": [6, 6], "xs": [4, 4], "xxs": [2, 2]}, #Margin between draggable components in pixels.
                    allowOverlap = True, #Components can now overlap each other.
                    draggableChildStyle = { ##Smaller padding, max height and backgroundcolor(for padding in practice)
                    'overflow': 'hidden',
                    'maxHeight': '100%',
                    'maxWidth': '100%',
                    "border": "5px solid yellow", ## This sort of creates some coloured extra padding for the handles.
                    "boxSizing": "border-box",     # Ensures border doesn't mess up sizing
                            },
                  
                ),
                dcc.Store(id="layout-store"),
            ], style={ 'backgroundColor': 'blue', 'overflowY':'hidden', 'height': '1200px'}
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
    # show how to dynamically change the handle background color of a wrapped component
    Output("draggable-map", "handleBackground"),
    Input("edit-mode", "n_clicks"),
    State("grid-layout", "showRemoveButton"),
    State("grid-layout", "showResizeHandles"),
    prevent_initial_call=True,
)
def enter_editable_mode(n_clicks, current_remove, current_resize):
    print("Edit mode clicked:", n_clicks)  # Debug print
    if n_clicks is None:
        raise PreventUpdate
    return not current_remove, not current_resize, "red"


@callback(Output("layout-output", "children"), Input("grid-layout", "itemLayout"))
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
        items.append(
            dgl.DraggableWrapper(
                dcc.Graph(
                    figure=px.scatter(
                        df, x="petal_width", y="petal_length", color="species"
                    ),
                    style={"height": "100%"},
                ),
                id=new_id
            )
        )
        itemLayout = Patch()
        itemLayout.append({"i": f"{new_id}", "w": 6})
        return items, itemLayout
    return no_update, no_update

@callback(
    Output("grid-layout", "items", allow_duplicate=True),
    Input("grid-layout", "itemToRemove"),
    State("grid-layout", "itemLayout"),
    prevent_initial_call=True,
)
def remove_component(key, layout):
    if key:
        items = Patch()
        print(key)
        for i in range(len(layout)):
            if layout[i]['i'] == key:
                del items[i]
                break
        return items
    return no_update


if __name__ == "__main__":
    app.run(debug=True)
