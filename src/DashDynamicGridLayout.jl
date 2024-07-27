
module DashDynamicGridLayout
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.2"

include("jl/dashgridcol.jl")
include("jl/dashgridlayout.jl")
include("jl/draggablewrapper.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dash_dynamic_grid_layout",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dash_dynamic_grid_layout.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dash_dynamic_grid_layout.min.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
