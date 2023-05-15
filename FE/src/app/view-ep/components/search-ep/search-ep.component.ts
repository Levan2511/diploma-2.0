import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SearchEP } from '../../models/education-plan';
import { Observable, debounceTime, map, startWith, tap, Subject, takeUntil } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ViewEpService } from '../../services/view-ep.service';
import { Router } from '@angular/router';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'lk-search-ep',
  templateUrl: './search-ep.component.html',
  styleUrls: ['./search-ep.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchEpComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  epForm = this.formBuilder.group({
    ep: '',
  });

  dataLoading = true;
  private educationPrograms: SearchEP[] = [];

  stateGroupOptions$!: Observable<SearchEP[]>;

  constructor(
    private formBuilder: FormBuilder,
    private viewEpService: ViewEpService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.viewEpService.getEducationPlanIds().subscribe(value => {
      this.educationPrograms = value;
      this.dataLoading = false;
      this.cdr.detectChanges();
    });
    this.stateGroupOptions$ = this.epForm.get('ep')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
    this.setQueryParamsOnValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.next()
  }

  private setQueryParamsOnValueChanges() {
    this.epForm.get('ep')!.valueChanges.pipe(
      debounceTime(250),
      tap(epId => this.router.navigate([], { queryParams: { epId } })),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  private _filterGroup(value: string): SearchEP[] {
    if (value) {
      return this.educationPrograms
        .map(group => ({ department: group.department, ids: _filter(group.ids, value)}))
        .filter(group => group.ids.length > 0);
    }

    return this.educationPrograms;
  }
}
