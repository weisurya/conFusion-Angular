import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
//import { LEADERS } from '../shared/leaders';
import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';

//'rxjs/Observable' could not use of
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';

//by using toPromise, Observable may only emit 1 value instead many values, because this func.
//is mimicing promise func. which only may emit 1 value
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

@Injectable()
export class LeaderService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService : ProcessHTTPMsgService) { }
  
    getLeaders(): Observable<Leader[]> {
      return this.restangular.all('leaders').getList();
    }
  
    getLeader(id: number): Observable<Leader> {
      return this.restangular.one('leaders', id).get();
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return this.restangular.all('leaders').getList({featured: true})
        .map(leaders => leaders[0]);
    }

}
