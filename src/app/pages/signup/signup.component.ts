import { Component, OnInit } from '@angular/core';
import { FbService } from 'src/app/services/firebase/fb.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage: string;

  constructor(private fb: FbService, private router: Router) { }

  ngOnInit() {
  }

  signup(e: any) {
    let email = e.target.email.value,
      password = e.target.password.value;

    this.fb.signup(email, password).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('')
    }, (err) => {
      // Handle error cases
        err.code === 'auth/network-request-failed' ? this.errorMessage = 'Network error. Check your connection and try again'
          : err.code === 'auth/email-already-in-use' ? this.errorMessage = 'User with email already exist'
            : this.errorMessage = err.message;
      
      setTimeout(()=> {
        this.errorMessage = ''
      }, 3000)
    });
  }

}
