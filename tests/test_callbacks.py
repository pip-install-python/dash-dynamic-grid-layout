import dash_dynamic_grid_layout as ddgl
from dash import *
from dash.testing.wait import until
import json
import time


def test_callbacks_basic_cb001(dash_duo):

    app = Dash(__name__)

    app.layout = [
        html.Div(
            [
                html.Button(id="test", n_clicks=0),
                html.Button(id="switch", n_clicks=0),
                ddgl.DashGridLayout(
                    id="grid-layout",
                    items=[
                        ddgl.DraggableWrapper(
                            html.Div(
                                children=[html.H1("hello")],
                                id="graph_1",
                                style={"height": "100%", "backgroundColor": "gray"},
                            ),
                            id="draggable-graph",
                        ),
                    ],
                    showRemoveButton=False,
                    showResizeHandles=False,
                    rowHeight=150,
                    cols={"lg": 12, "md": 10, "sm": 6, "xs": 4, "xxs": 2},
                    style={"height": "800px"},
                    compactType="horizontal",
                ),
            ]
        )
    ]

    @callback(
        Output("grid-layout", "showRemoveButton"),
        Output("grid-layout", "showResizeHandles"),
        Input("switch", "n_clicks"),
        prevent_initial_call=True,
    )
    def switch_edit(n):
        if n:
            return n % 2 > 0, n % 2 > 0
        return no_update, no_update

    @callback(
        Output("graph_1", "children"),
        Input("test", "n_clicks"),
    )
    def update_graphs(n):
        if n:
            return n
        return no_update

    dash_duo.start_server(app)

    until(
        lambda: "hello" in dash_duo.find_element("#graph_1").get_attribute("innerText"),
        timeout=3,
    )

    for x in [1, 2]:
        dash_duo.find_element("#test").click()
        until(
            lambda: str(x)
            in dash_duo.find_element("#graph_1").get_attribute("innerText"),
            timeout=3,
        )

    for x in [3, 4]:
        dash_duo.find_element("#switch").click()
        until(
            lambda: dash_duo.find_element("#draggable-graph > div").is_displayed()
            == (x == 3),
            timeout=3,
        )
        until(
            lambda: str(x - 1)
            in dash_duo.find_element("#graph_1").get_attribute("innerText"),
            timeout=3,
        )
        dash_duo.find_element("#test").click()
        until(
            lambda: str(x)
            in dash_duo.find_element("#graph_1").get_attribute("innerText"),
            timeout=3,
        )
