import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  initialValueOfLoginState = localStorage.getItem('user')
  isLoggedIn = new BehaviorSubject(this.initialValueOfLoginState)
  paginationObj:any = new BehaviorSubject(null)
  constructor(

    private _http: HttpClient,
  ) {

  }


  getProducts(category: string,limit:number,skip:number,search:string|undefined) {
    const url = category == 'all' ? `products` : `products/category/${category}`
    var params = '?'
    params += `limit=${limit}&skip=${skip}`
    if (search) params += `&search=${search}`
    return this._http.get<any>(environment.app_api_url + url+params)

  }

  getCategories() {
    return this._http.get<any>(environment.app_api_url + `products/category-list`)

  }

}
