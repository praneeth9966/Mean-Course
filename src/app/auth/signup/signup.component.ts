import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthService} from '../auth.service';
import { from } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
isLoading = false;

defaultValue= '';

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(form:NgForm){
    if(form.invalid){
      return;
    } 
    this.isLoading = true;
    this.authService.createUser(form.value.role,form.value.email, form.value.password);
  }
}
