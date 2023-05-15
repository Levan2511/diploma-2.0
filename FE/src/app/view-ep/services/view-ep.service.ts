import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { SearchEP } from '../models/education-plan';

@Injectable({
  providedIn: 'root'
})
export class ViewEpService {

  constructor(private http: HttpService) { }

  getEducationPlanIds(): Observable<SearchEP[]> {
    return this.http.get('/api/ep-ids', {}, false);
  }
}
