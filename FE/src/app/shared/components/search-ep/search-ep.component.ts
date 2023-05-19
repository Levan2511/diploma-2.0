import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Observable, debounceTime, map, startWith, tap, Subject, takeUntil, switchMap } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewEpService } from 'src/app/view-ep/services/view-ep.service';
import { SearchEP } from 'src/app/view-ep/models/education-plan';

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
    ep: this.getDefaultValueFromQueryParams(),
  });

  dataLoading = true;
  private educationPrograms: SearchEP[] = [];

  stateGroupOptions$!: Observable<SearchEP[]>;

  constructor(
    private formBuilder: FormBuilder,
    private viewEpService: ViewEpService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.stateGroupOptions$ = this.viewEpService.getEducationPlanIds().pipe(
      tap(value => {
        this.educationPrograms = value;
        this.dataLoading = false;
        this.cdr.markForCheck();
      }),
      switchMap(() => this.epForm.get('ep')!.valueChanges),
      startWith(this.getDefaultValueFromQueryParams() || ''),
      debounceTime(250),
      tap(epId => this.router.navigate([], { queryParams: { epId } })),
      map(value => this._filterGroup(value || '')),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy() {
    this.destroy$.next()
  }

  private _filterGroup(value: string): SearchEP[] {
    if (value) {
      return this.educationPrograms
        .map(group => ({ department: group.department, ids: _filter(group.ids, value)}))
        .filter(group => group.ids.length > 0);
    }

    return this.educationPrograms;
  }

  private getDefaultValueFromQueryParams(): string {
    return this.activatedRoute.snapshot.queryParams['epId'];
  }
}
