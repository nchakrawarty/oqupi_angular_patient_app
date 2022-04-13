import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Urls } from './constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {

  constructor(private http: HttpClient) { }

  // public uploadImage(image: File): Observable<Response> {
  //   const formData = new FormData();

  //   formData.append('image', image);
  //   // return this.http.post(`${Urls.FILES}/images/upload?access_token=${this.token}`, formData', formData)
  //   // return this.http.post(`${Urls.FILES}/images/upload?access_token=${this.token}`, formData)
  // }
  public uploadImage(image: File): Observable<Object> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post(`${Urls.FILES}/images/upload?`, formData);
  }
}
