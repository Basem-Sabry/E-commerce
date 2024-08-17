import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loggedIn: boolean = false
  cartArr: any[] = []
  searchVal:string = ''
  constructor(private _shared : SharedService,private _router : Router) {
    this.getCart()
  }
  ngOnInit(): void {
    this._shared.isLoggedIn.subscribe(res => {
      if (res) {
        this.loggedIn = true
      }
    })

    this._shared.myCart.subscribe(res => {
      if (res) {
        console.log('Res',res)
        this.saveCart(res)
    }
  })
  }
  getCart() {
    const initialValueForTheCart = localStorage.getItem('cart')
    if (initialValueForTheCart) {
      this.cartArr = JSON.parse(initialValueForTheCart)
    }

  }
  saveCart(product:any) {
    this.cartArr.push(product)
    localStorage.setItem('cart',JSON.stringify(this.cartArr))
  }
  logout(){
    localStorage.clear()
    this.loggedIn = false
    this.cartArr = []
    this._shared.isLoggedIn.next(null)
    this._router.navigate(['/'])
  }
  startSearch() {
    this._shared.searchSubject.next(this.searchVal)
  }
}
