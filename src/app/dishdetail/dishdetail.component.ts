import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { DishService } from '../services/dish.service';

//import 'rxjs/add/operator/switchmap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dishDetailCommentForm: FormGroup;
  
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  errMess: string;

  formErrors = {
    'author' : '',
    'comment' : '',
  }

  validationMessages = {
    'author' : {
      'required': 'Author Name is required.',
      'minlength' : 'Author Name must be at least 2 characters long.'
    },
    'comment' : {
      'required' : 'Comment is required.'
    }
  }

  @ViewChild('ddCommentForm') ddCommentFormDirective;

  commentForm: FormGroup;
  
  constructor(private dishservice: DishService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              @Inject('BaseURL') private BaseURL) {
                this.createForm();
              }

  ngOnInit() {
    //let id = +this.route.snapshot.params['id'];
    //this.dishservice.getDish(id).subscribe(dish => this.dish = dish );

    this.dishservice.getDishIds()
    .subscribe(dishIds => this.dishIds = dishIds );

    this.route.params
    .switchMap((params: Params) => this.dishservice.getDish(+params['id']))
    .subscribe(dish => {
      this.dish = dish;
      this.setPrevNext(dish.id)
    },
    errmess => this.errMess = <any>errmess);
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.dishDetailCommentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment: ['', [Validators.required]]
    });

    this.dishDetailCommentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    if(!this.dishDetailCommentForm) {return;}

    const form = this.dishDetailCommentForm;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    console.log(this.dishDetailCommentForm.value);

    this.dish.comments.push({
      rating: this.dishDetailCommentForm.value.rating,
      comment: this.dishDetailCommentForm.value.comment,
      author: this.dishDetailCommentForm.value.author,
      date: new Date().toISOString()
    })


    this.ddCommentFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: ''
    });
  }

  goBack(): void{
    this.location.back();
  }

}
