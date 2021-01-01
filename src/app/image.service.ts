import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from 'src/app/notification.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient, private notiService: NotificationService) { }

  upload(formData: FormData): Observable<any> {
    return this.http.post(`${environment.backend_host}/api/images`, formData).pipe(
      tap(() => this.notiService.success("Images have been uploaded")),
      catchError((err: HttpErrorResponse) => {
        this.notiService.error(err.message);
        return throwError(err);
      }));
  }

  get(search? : string): Observable<string[]> {
    let params = new HttpParams();
    if(search != null || search != "") params = params.set("search", search);
    return this.http.get<string[]>(`${environment.backend_host}/api/images`, { params: params }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.notiService.error(err.message);
        return throwError(err);
      })
    )
  }
}
