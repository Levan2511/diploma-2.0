import { EducationPlan, SearchEP } from '@common/ep-models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewEpService {

  constructor(private http: HttpService) { }

  getEducationPlanIds(): Observable<SearchEP[]> {
    return this.http.get(`${environment.apiUrl}/ep/ids`, {}, false, false);
  }

  getEducationPlanById(id: string) {
    return this.http.get<EducationPlan>(`${environment.apiUrl}/ep/ep-by-id`, {
      params: {
        epId: id
      }
    }, false, false)
  }

  deleteEducationPlanById(id: string) {
    return this.http.delete(`${environment.apiUrl}/ep/ep-by-id`, {
      params: {
        epId: id
      }
    }, true, false)
  }

  cancelRemoval() {
    return this.http.get(`${environment.apiUrl}/ep/cancel-removal`, {}, true, false);
  }

  saveEducationPlan(planId: string, plan: EducationPlan) {
    return this.http.post(`${environment.apiUrl}/ep/save`, plan, {
      params: {
        epId: planId
      }
    }, true, false);
  }
}
