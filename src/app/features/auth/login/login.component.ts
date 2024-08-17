import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  loading:boolean = false
  constructor(private _auth:AuthService,private router: Router,private _fb:FormBuilder,private  _shared : SharedService) { }

  ngOnInit() {
    this.initLoginForm()
  }
  initLoginForm() {
    this.form = this._fb.group({
      username: ['emilys', Validators.required],
      password: ['emilyspass', Validators.required]
    })
  }
  login() {
    this.loading = true
    this._auth.login(this.form.value).subscribe({
      next: (response) => {
        this.loading = false
        const user = {
          id: response?.id,
          firstName: response?.firstName,
          lastName: response?.lastName,
          gender: response?.gender,
          image: response?.image,
          name: response?.firstName,
          email: response?.email,

        }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', response?.token);
        this._shared.isLoggedIn.next(JSON.stringify(user))

        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.loading = false

      }
    })
  }
}
