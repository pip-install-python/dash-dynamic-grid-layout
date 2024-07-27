# AUTO GENERATED FILE - DO NOT EDIT

#' @export
draggableWrapper <- function(children=NULL) {
    
    props <- list(children=children)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DraggableWrapper',
        namespace = 'dash_dynamic_grid_layout',
        propNames = c('children'),
        package = 'dashDynamicGridLayout'
        )

    structure(component, class = c('dash_component', 'list'))
}
