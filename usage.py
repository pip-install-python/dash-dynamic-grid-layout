import dash_dynamic_grid_layout as dgl
from dash import Dash, html, dcc
from dash.dependencies import Input, Output
import plotly.express as px
import dash_leaflet as dl

app = Dash(__name__)

# Sample data for the graph
df = px.data.iris()

app.layout = html.Div([
    dgl.DashGridLayout(
        id='grid-layout',
        children=[
            dgl.DraggableWrapper(
                children=[
                    dl.Map(dl.TileLayer(), center=[56, 10], zoom=6, style={'height': '100vh', 'width': '100vw'})
                ]
            ),
            dgl.DraggableWrapper(html.Img(src='https://picsum.photos/200/300',
                                          style={'width': '100%', 'height': '100%', 'objectFit': 'cover'})),
            dgl.DraggableWrapper(dcc.Graph(
                id='example-graph',
                figure=px.scatter(df, x="sepal_width", y="sepal_length", color="species"),
                style={'height': '100%'}
            ))
        ],
        allowAddItem=True,
        newItemTemplate=dcc.Graph(
            figure=px.scatter(df, x="petal_width", y="petal_length", color="species"),
            style={'height': '100%'}
        ),
        rowHeight=150,
        cols={'lg': 12, 'md': 10, 'sm': 6, 'xs': 4, 'xxs': 2},
        style={'height': '800px'},
        compactType=None  # Set to None to turn off vertical compacting
    ),
    html.Div(id='layout-output')
])


@app.callback(
    Output('layout-output', 'children'),
    Input('grid-layout', 'itemCount')
)
def display_layout(item_count):
    return f'Number of items: {item_count}'


if __name__ == '__main__':
    app.run_server(debug=True)
