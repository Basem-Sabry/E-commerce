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


    return this._http.post<any>(environment.app_api_url + `auth/login`,req_body)
}


}
