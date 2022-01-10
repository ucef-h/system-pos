import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {
  @ViewChild('f') signupForm: NgForm;
  defaultQuestion:string = 'pet';
  answer:string;
  genders = ['male', 'female'];
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  };
  submitted = false;
  constructor() { }

  ngOnInit(): void {
    return;
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signupForm.setValue({
      userData: {
        username : suggestedName,
        email: ''
      },
      secret: this.defaultQuestion,
      questionAnswer: '',
      gender: 'male'
    });
    this.signupForm.form.patchValue({
      userdata: suggestedName
    });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.signupForm);

    this.submitted = true;
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;

    this.signupForm.reset();
  }
}
