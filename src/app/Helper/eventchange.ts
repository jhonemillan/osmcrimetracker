import { Point } from './../model/point';

export class ListenerObject{
    private position: Point;
    private marker;

    constructor(marker:object){        
        this.marker = marker;
    }

    getPosition(){
        return this.position;
    }

    getMarker(){
        return this.marker;
    }

    
}