import { EducationPlan, SearchEP } from '@common/ep-models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class ViewEpService {

  constructor(private http: HttpService) { }

  getEducationPlanIds(): Observable<SearchEP[]> {
    return this.http.get('/api/ep-ids', {}, false, false);
  }

  getEducationPlanById(id: string) {
    return this.http.get<EducationPlan>('/api/ep-ids/ep-by-id', {
      params: {
        epId: id
      }
    }, false, false)
  }
}
