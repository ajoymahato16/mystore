import { CommonModule} from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngxs/store';
import { User } from '../../model/user.model'; // Adjust the path as needed
import { SetUser } from '../../state/user.state.action'; // Adjust the path as needed
import { UserState } from '../../state/user.state'; // Adjust the path as needed
import { UserSelectors } from '../../state/user.state.selector'; // Adjust the path as needed
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { authService } from '../../services/auth.service';




@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {

  loginForm!: FormGroup;



  constructor(private fb: FormBuilder, private authService: authService, private store: Store) { }


@Output() closePopup = new EventEmitter<void>();
@Output() loginSuccess = new EventEmitter<void>();

ngOnInit(): void {

  this.loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

}

isInvalid(field:string):boolean{
  return (!!this.loginForm.get(field)?.invalid) && (!!this.loginForm.get(field)?.touched || !!this.loginForm.get(field)?.dirty);
}

onSubmit() {
  console.log("submit clicked");
  if(this.loginForm.valid){
    const {username, password} = this.loginForm.value;
    this.authService.login(username,password).subscribe({
      next:(response)=>{

        if(response){
     

          const user: User = {
            id:  response.id,
            userName:  response.username,
            email:  response.email,
            firstName: response.firstName,
            lastName:response.lastName,
            gender: response.gender,
            image: response.image,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          };
      
       
          this.closePopup.emit();
          this.loginForm.reset(); // Reset the form after successful login
          
            this.store.dispatch(new SetUser(user)).subscribe(() => {
              const fullState = this.store.selectSnapshot(state => state);
            // ✅ Check store value after dispatch
              this.store.selectOnce(UserSelectors.isLoggedIn).subscribe(status => {
                console.log('Store Logged In Status:', fullState);
                this.loginSuccess.emit(); // Emit the login success event
              });
            });
        }else{
          alert("Login Failed");
        }
      }
      ,error:(error)=>{
        console.log("login error", error);
        alert("Login Failed");
      }
    })


     console.log("form is valid", this.loginForm.value);



  }else{
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      console.log("form is invalid", this.loginForm.errors);

  }
}

  hideModal() {
    this.closePopup.emit();
  }



}
