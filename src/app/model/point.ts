import * as geojson from 'geojson';

export interface Point{
    user_id: string;
    comment: string;
    geolocation: geojson.Point
}