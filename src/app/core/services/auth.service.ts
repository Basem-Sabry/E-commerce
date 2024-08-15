import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private _http: HttpClient,
  ) { }


  login(req_body:any) {
    const formData = new FormData()
    formData.append('email', req_body.email)
    formData.append('password',req_body.password)

    return this._http.post<any>(environment.app_api_url + `/auth/login`,formData)
}


}
