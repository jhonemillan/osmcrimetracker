import * as geojson from 'geojson';

export interface Point{
    userd_id: string;
    comment: string;
    geolocation: geojson.Point
}