import { Injectable } from '@angular/core';

import { Feedback } from '../shared/feedback';
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
export class FeedbackService {

  constructor(private restangular: Restangular,
              private processHTTPMsgService : ProcessHTTPMsgService) { }

  submitFeedback(feedback: Feedback): Observable<Feedback[]> {
      return this.restangular.all('feedback').post(feedback);
    }

}
