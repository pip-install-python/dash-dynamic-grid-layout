# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashGridLayout <- function(children=NULL, id=NULL, allowAddItem=NULL, className=NULL, cols=NULL, compactType=NULL, itemCount=NULL, newItemTemplate=NULL, onLayoutChange=NULL, rowHeight=NULL, style=NULL) {
    
    props <- list(children=children, id=id, allowAddItem=allowAddItem, className=className, cols=cols, compactType=compactType, itemCount=itemCount, newItemTemplate=newItemTemplate, onLayoutChange=onLayoutChange, rowHeight=rowHeight, style=style)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashGridLayout',
        namespace = 'dash_dynamic_grid_layout',
        propNames = c('children', 'id', 'allowAddItem', 'className', 'cols', 'compactType', 'itemCount', 'newItemTemplate', 'onLayoutChange', 'rowHeight', 'style'),
        package = 'dashDynamicGridLayout'
        )

    structure(component, class = c('dash_component', 'list'))
}
