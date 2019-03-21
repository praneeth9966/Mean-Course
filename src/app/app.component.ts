import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
// import {Post} from './post.model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mean-course';
  
  constructor(private authService: AuthService) {} 

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
