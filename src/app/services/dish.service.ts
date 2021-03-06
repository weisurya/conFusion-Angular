import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs/Rx';
import { RestangularModule, Restangular } from 'ngx-restangular';

//by using toPromise, Observable may only emit 1 value instead many values, because this func.
//is mimicing promise func. which only may emit 1 value
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class DishService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  getDishes(): Observable<Dish[]> {
    //return Promise.resolve(DISHES);
    //return new Promise(resolve => {
    //Silumate server latency with 2 sec. delay
    //  setTimeout(() => resolve(DISHES), 2000);
    //});
    
    //return Observable.of(DISHES).delay(2000);
    // return this.http.get(baseURL + 'dishes')
    //   .map(res => { return this.processHTTPMsgService.extractData(res); })
    //   .catch(error => { return this.processHTTPMsgService.handleError(error); });

    return this.restangular.all('dishes').getList();
  }

  getDish(id: number): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => (dish.id === id))[0]).delay(2000);
    return this.restangular.one('dishes', id).get();
  }

  getFeaturedDish(): Observable<Dish> {
    //return Observable.of(DISHES.filter((dish) => dish.featured)[0]).delay(2000);
    // return this.http.get(baseURL + 'dishes?featured=true')
    //   .map(res => { return this.processHTTPMsgService.extractData(res)[0]; })
    //   .catch(error => { return this.processHTTPMsgService.handleError(error); });

    return this.restangular.all('dishes').getList({featured: true})
      .map(dishes => dishes[0]);
  }

  getDishIds(): Observable<number[]> {
    //return Observable.of(DISHES.map(dish => dish.id)).delay(2000);
    return this.getDishes()
      .map(dishes => { return dishes.map(dish => dish.id); })
      .catch(error => { return error; });
  }
}
