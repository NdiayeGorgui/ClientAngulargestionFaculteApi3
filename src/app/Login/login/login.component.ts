import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
user=new User
erreur=0;


  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
onLoggedIn(){
  console.log(this.user);
  let isValidUser:Boolean=this.authService.signIn(this.user);
  if(isValidUser)
  this.router.navigate(['/']);
  else 
  //alert('Login ou mot de passe incorrect !')
  this.erreur=1;
}
}

