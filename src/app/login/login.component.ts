import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formValue! : FormGroup

   constructor(private fb:FormBuilder){}

   ngOnInit():void {
    this.formValue = this.fb.group({
      username:[''],
      password:[''],
    });
  }

}
