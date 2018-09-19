import * as geojson from 'geojson';

export interface Point{
    user_id: string;
    comment: string;
    geolocation: geojson.Point
}

export interface BoundsMap{
    geometry : {
        type : 'Polygon',
        coordinates : [[number, number],                        
                       [number, number]]
    }    
}

export interface PointGeometry{
    lat: number;
    lng: number;
}