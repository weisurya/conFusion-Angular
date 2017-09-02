import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedbackForm2: FormGroup;
  feedback: Feedback;
  feedback2: Feedback;
  contactType = ContactType;
  @ViewChild('f') feedbackFormDirective;
  //@ViewChild('f2') feedbackFormDirective2;

  constructor(private fb: FormBuilder) {
    this.createForm();  
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
    /*this.feedbackForm2 = this.fb.group({
      firstname: '',
      lastname: '',
      telnum: 0,
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });*/
  }

  onSubmit() {
    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    //this.feedbackForm.reset();
    this.feedbackFormDirective.resetForm();
  }
  
  /*onSubmit2() {
    this.feedback2 = this.feedbackForm2.value;
    console.log(this.feedback2);
    //this.feedbackForm.reset();
    this.feedbackFormDirective2.resetForm();
  }*/
}
