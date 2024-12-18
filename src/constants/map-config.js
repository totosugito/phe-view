export const DEFAULT_MAP_TILE = "opentstreetmap";
export const mapTileList = [
    {
        key: "esri-world",
        name: "Esri Satellite",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        attribution: "© Esri © OpenStreetMap Contributors",
        thumbnail: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/16/25"
    },
    {
        key: "opentstreetmap",
        name: "OpenStreetMap",
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: "&copy; OpenStreetMap contributors",
        thumbnail: "https://c.tile.openstreetmap.org/5/25/16.png"
    },
    {
        key: "opentopomap",
        name: "OpenTopoMap",
        url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        attribution: "&copy; OpenTopoMap contributors",
        thumbnail: "https://c.tile.opentopomap.org/5/25/16.png"
    },
    {
        key: "google-satellite",
        name: "Google Satellite",
        url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
        attribution: "&copy; Google",
        thumbnail: "https://mt1.google.com/vt/lyrs=s&x=25&y=16&z=5"
    },
]

export const mapLegendProductionRate = [
    {
        id: 0,
        key: "poor",
        view: "circle",
        name: "Poor",
        bgColor: "#FF0000",
        borderColor: "#000000",
        min: 0.25,
        size: "16px"
    },
    {
        id: 1,
        key: "fair",
        view: "circle",
        name: "Fair",
        bgColor: "#FFA500",
        borderColor: "#000000",
        min: 0.5,
        size: "16px"
    },
    {
        id: 2,
        key: "good",
        view: "circle",
        name: "Good",
        bgColor: "#32CD32",
        borderColor: "#000000",
        min: 0.75,
        size: "16px"
    },
    {
        id: 3,
        key: "excellent",
        view: "circle",
        name: "Excellent",
        bgColor: "#008000",
        borderColor: "#000000",
        min: 1,
        size: "16px"
    },
    {
        id: 4,
        key: "inactive",
        view: "circle",
        name: "Inactive",
        bgColor: "#ABABAB",
        borderColor: "#000000",
        min: 1,
        size: "16px"
    },
];

export const mapLegendProductionTrend = [
    {
        id: 0,
        key: "poor",
        view: "circle",
        name: "Down",
        bgColor: "#CC0AC3",
        borderColor: "#000000",
        min: 0.25,
        size: "16px"
    },
    {
        id: 1,
        key: "fair",
        view: "circle",
        name: "Semi-Down",
        bgColor: "#FF1FCE",
        borderColor: "#000000",
        min: 0.5,
        size: "16px"
    },
    {
        id: 2,
        key: "good",
        view: "circle",
        name: "Semi-Up",
        bgColor: "#008DFF",
        borderColor: "#000000",
        min: 0.75,
        size: "16px"
    },
    {
        id: 3,
        key: "excellent",
        view: "circle",
        name: "Up",
        bgColor: "#0056FE",
        borderColor: "#000000",
        min: 1,
        size: "16px"
    },
];

export const mapLegendProductionPerformance = [
    {
        id: 0,
        key: "poor",
        view: "circle",
        name: "Poor",
        bgColor: "#CC0AC3",
        borderColor: "#000000",
        min: 0.25,
        size: "16px"
    },
    {
        id: 1,
        key: "fair",
        view: "circle",
        name: "Fair",
        bgColor: "#FFC0CB",
        borderColor: "#000000",
        min: 0.5,
        size: "16px"
    },
    {
        id: 2,
        key: "good",
        view: "circle",
        name: "Good",
        bgColor: "#00BFFF",
        borderColor: "#000000",
        min: 0.75,
        size: "16px"
    },
    {
        id: 3,
        key: "excellent",
        view: "circle",
        name: "Excellent",
        bgColor: "#0056FE",
        borderColor: "#000000",
        min: 1,
        size: "16px"
    },
    {
        id: 4,
        key: "inactive",
        view: "circle",
        name: "Inactive",
        bgColor: "#ABABAB",
        borderColor: "#000000",
        min: 1,
        size: "16px"
    },
];

export function getTileMap(key) {
    let selected = mapTileList.find(obj => obj.key === key);
    if (selected === undefined) {
        selected = mapTileList[0];
    }
    return (selected);
}

export function getMapLegendItem(mapLegends, key) {
    let selected = mapLegends.find(obj => obj.key === key.toLowerCase());
    if (selected === undefined) {
        selected = mapLegends[0];
    }

    return (selected);
}

export function defaultMapProps() {
    return(
        {
            "initial": {
                "zoom": 9,
                "center": [
                    -4.9,
                    106.5
                ]
            },
            "wells": {
                "type": "FeatureCollection",
                "crs": {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                },
                "projects": []
            }
        }
    )
}
