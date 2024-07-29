# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashGridLayout <- function(children=NULL, id=NULL, addItem=NULL, className=NULL, cols=NULL, compactType=NULL, currentLayout=NULL, itemCount=NULL, newItemTemplate=NULL, onLayoutChange=NULL, rowHeight=NULL, showRemoveButton=NULL, showResizeHandles=NULL, style=NULL) {
    
    props <- list(children=children, id=id, addItem=addItem, className=className, cols=cols, compactType=compactType, currentLayout=currentLayout, itemCount=itemCount, newItemTemplate=newItemTemplate, onLayoutChange=onLayoutChange, rowHeight=rowHeight, showRemoveButton=showRemoveButton, showResizeHandles=showResizeHandles, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashGridLayout',
        namespace = 'dash_dynamic_grid_layout',
        propNames = c('children', 'id', 'addItem', 'className', 'cols', 'compactType', 'currentLayout', 'itemCount', 'newItemTemplate', 'onLayoutChange', 'rowHeight', 'showRemoveButton', 'showResizeHandles', 'style'),
        package = 'dashDynamicGridLayout'
        )

    structure(component, class = c('dash_component', 'list'))
}
