import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { visibility, flyInOut, expand } from '../animations/app.animations';

import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  host: {
    '[@flyInOut]' : 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand(),
    visibility(),
    
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  //feedbackForm2: FormGroup;
  feedback: Feedback;
  //feedback2: Feedback;
  contactType = ContactType;

  showForm = true;
  submitForm = false;

  errMess: string;

  formErrors = {
    'firstname' : '',
    'lastname' : '',
    'telnum' : '',
    'email' : ''
  };
  
  validationMessages = {
    'firstname': {
      'required': 'First name is required.',
      'minlength': 'First name must be at least 2 characters long.',
      'maxlength': 'First name cannot be more than 25 characters long.'
    },
    'lastname': {
      'required': 'Last name is required.',
      'minlength': 'Last name must be at least 2 characters long.',
      'maxlength': 'Last name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required': 'Tel. number is required.',
      'pattern': 'Tel. number must contain only numbers'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Email not in valid format.'
    },
  };

  @ViewChild('f') feedbackFormDirective;
  //@ViewChild('f2') feedbackFormDirective2;

  constructor(private fb: FormBuilder,
              private feedbackservice: FeedbackService,) {
    this.createForm();  
  }

  ngOnInit() {
  }

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //(re)set form validation messages

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

  onValueChanged(data?: any) {
    if(!this.feedbackForm) {return;}

    const form = this.feedbackForm;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.showForm = false;
    this.submitForm = true;

    this.feedback = this.feedbackForm.value;
    console.log(this.feedback);
    //this.feedbackForm.reset();

    this.feedbackservice.submitFeedback(this.feedback)
      .subscribe(feedback => {
        this.submitForm = false;
        setTimeout(() => this.showForm = true, 5000);
      },
      errmess => this.errMess = <any>errmess);

    this.feedbackFormDirective.resetForm({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: ''
    });
  }
  
  /*onSubmit2() {
    this.feedback2 = this.feedbackForm2.value;
    console.log(this.feedback2);
    //this.feedbackForm.reset();
    this.feedbackFormDirective2.resetForm();
  }*/
}
