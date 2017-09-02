import { Injectable } from '@angular/core';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

//'rxjs/Observable' could not use of
//import { Observable } from 'rxjs/Observable';
import { Observable } from 'rxjs/Rx';

//by using toPromise, Observable may only emit 1 value instead many values, because this func.
//is mimicing promise func. which only may emit 1 value
//import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/delay';

@Injectable()
export class LeaderService {

  constructor() { }
  
    getLeaders(): Observable<Leader[]> {
      return Observable.of(LEADERS).delay(2000);
    }
  
    getLeader(id: number): Observable<Leader> {
      return Observable.of(LEADERS.filter((leader) => (leader.id === id))[0]).delay(2000);
    }
  
    getFeaturedLeader(): Observable<Leader> {
      return Observable.of(LEADERS.filter((leader) => leader.featured)[0]).delay(2000);
    }

}
