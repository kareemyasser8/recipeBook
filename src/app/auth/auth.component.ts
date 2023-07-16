import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if(this.isLoginMode){

    }else{
      this.authService.signup(email,password).subscribe({
        next: (repsonse)=>{
          console.log(repsonse);
          this.isLoading = false;
        },
        error: (err)=> {
          console.log(err);
          this.error = 'An Error occured!'
          this.isLoading = false;
        }
      });
      form.reset();
    }

  }

  ngOnInit(): void {
  }

}
