import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _auth:AuthService,private router: Router) { }

  ngOnInit() {
  }
  login() {
    const req_body:any = {

    }
    this._auth.login(req_body).subscribe({
      next: (response) => {
        console.log(response)
        const user = {
          id: response?.user?.id,
          name: response?.user?.name,
          email: response?.user?.email,

        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response?.data?.token);


        this.router.navigate(['/dashboard'])
      },
      error: (err) => {

      }
    })
  }
}
