import { Point, PointGeometry, BoundsMap } from './../model/point';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  point: any;
  baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }

  addPoint(point: Point):Observable<Point>{
    return this.http.post<Point>(this.baseUrl+'/map/add', point);
  }

  getAllPoints(): Observable<Point[]>{   
    return this.http.get<Point[]>(this.baseUrl + '/map/all' );
  }

  getUser(): Observable<any>{
    return this.http.get(this.baseUrl+'/auth/getuser');
  }

}
