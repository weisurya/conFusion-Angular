import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';

import { Observable } from 'rxjs/Rx';

//by using toPromise, Observable may only emit 1 value instead many values, because this func.
//is mimicing promise func. which only may emit 1 value
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class DishService {

  constructor() { }

  getDishes(): Observable<Dish[]> {
    //return Promise.resolve(DISHES);
    //return new Promise(resolve => {
    //Silumate server latency with 2 sec. delay
    //  setTimeout(() => resolve(DISHES), 2000);
    //});
    
    return Observable.of(DISHES).delay(2000);
  }

  getDish(id: number): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
  }

  getFeaturedDish(): Observable<Dish> {
    return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
  }
}
