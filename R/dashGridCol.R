# AUTO GENERATED FILE - DO NOT EDIT

#' @export
dashGridCol <- function(children=NULL, size=NULL) {
    
    props <- list(children=children, size=size)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DashGridCol',
        namespace = 'dash_dynamic_grid_layout',
        propNames = c('children', 'size'),
        package = 'dashDynamicGridLayout'
        )

    structure(component, class = c('dash_component', 'list'))
}
