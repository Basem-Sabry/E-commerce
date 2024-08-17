import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  loggedIn:boolean = false
  constructor(private _shared : SharedService,private _router : Router) {

  }
  ngOnInit(): void {
    this._shared.isLoggedIn.subscribe(res => {
      if (res) {
        console.log('reser',res)
        this.loggedIn = true
      }
    })


  }
  logout(){
    localStorage.clear()
    this.loggedIn = false
    this._shared.isLoggedIn.next(null)
    this._router.navigate(['/'])
  }
}
