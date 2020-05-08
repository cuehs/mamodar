import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StateService} from '../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: string;
  password: string;
  // no password and no username should not show the error message
  private passwordCorrect = true;
  constructor(private stateService: StateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  onClick() {
    this.passwordCorrect = false;
    this.stateService.loginUser(this.login, this.password).subscribe(_ => {
      if (this.stateService.getLoggedInUser()) {
        this.router.navigate(['/projects'], {queryParams: this.route.snapshot.queryParams});
        this.passwordCorrect = true;
      }
    });

  }

}