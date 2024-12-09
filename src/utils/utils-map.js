export const geoJsonPointsToArray = (geoJson) => {
    let points = [];
    if (geoJson?.features) {
        for (let i = 0; i < geoJson.features.length; i++) {
            let properties = geoJson.features[i].properties;
            points.push({
                "name": properties.asset_name ?? "",
                "x": properties.x_easting ?? 0,
                "y": properties.y_northing ?? 0,
                "x_long": properties.x_long ?? 0,
                "y_lat": properties.y_lat ?? 0,
                "heading": properties.heading ?? "",
                "asset_type": properties.asset_type ?? "",
                "region": properties.region ?? "",
                "remarks": properties.remarks ?? ""
            });
        }
    }
    return points;
}