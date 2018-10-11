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
    return this.http.post<Point>('http://localhost:3000/map/add', point);
  }

  getAllPoints(): Observable<Point[]>{   
    return this.http.get<Point[]>(this.baseUrl + '/map/all' );
  }

  getUser(): Observable<any>{
    return this.http.get(this.baseUrl + '/auth/getuser');
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
