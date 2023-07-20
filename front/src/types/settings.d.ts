export interface SettingStateType {
    dimensions:number,
    transformations:number,
    dataOutputFormat: 'Decimal Degrees' | 'Degrees Minutes' | 'Degrees Minutes Seconds',
    outputFile: 'shp' | 'geojson' | 'kml' | 'gml' | 'gpx' | 'tif' | 'nc' | 'csv',
    setState:(c:SettingStateType)=>void,
};