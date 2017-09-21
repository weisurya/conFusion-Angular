import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';

import { Http, Response } from '@angular/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { Observable } from 'rxjs/Rx';

//by using toPromise, Observable may only emit 1 value instead many values, because this func.
//is mimicing promise func. which only may emit 1 value
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class PromotionService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return this.restangular.one('promotions', id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);
  }

}
