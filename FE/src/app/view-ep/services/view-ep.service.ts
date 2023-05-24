import { EducationPlan, SearchEP } from '@common/ep-models';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/core/services/http.service';

const API_EP_BASE = '/api/ep';

@Injectable({
  providedIn: 'root'
})
export class ViewEpService {

  constructor(private http: HttpService) { }

  getEducationPlanIds(): Observable<SearchEP[]> {
    return this.http.get(`${API_EP_BASE}/ids`, {}, false, false);
  }

  getEducationPlanById(id: string) {
    return this.http.get<EducationPlan>(`${API_EP_BASE}/ep-by-id`, {
      params: {
        epId: id
      }
    }, false, false)
  }

  saveEducationPlan(planId: string, plan: EducationPlan) {
    return this.http.post(`${API_EP_BASE}/save`, plan, {
      params: {
        epId: planId
      }
    }, true, false);
  }
}
