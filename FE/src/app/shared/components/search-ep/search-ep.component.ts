import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SearchEP } from '../../models/education-plan';
import { Observable, map, startWith } from 'rxjs';
import { FormBuilder } from '@angular/forms';

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
export class SearchEpComponent implements OnInit {
  epForm = this.formBuilder.group({
    ep: '',
  });

  educationPrograms: SearchEP[] = [
    {
      department: '503 кафедра',
      names: [
        '[ 5 ф. ][ 503 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 503 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 125 Кібербезпека ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 503 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 124 Комп`ютерні Науки ][ Системне Обчислювання ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 503 каф. ][ Маг ][ 1.5р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
      ]
    },
    {
      department: '601 кафедра',
      names: [
        '[ 6 ф. ][ 601 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 6 ф. ][ 601 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 126 Кібербезпека ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 601 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 124 Комп`ютерні Науки ][ Системне Обчислювання ][офн][ус][ум][1н][X]',
        '[ 6 ф. ][ 601 каф. ][ Маг ][ 1.5р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
      ]
    },
    {
      department: '402 кафедра',
      names: [
        '[ 5 ф. ][ 402 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 402 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 126 Кібербезпека ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 402 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 124 Комп`ютерні Науки ][ Системне Обчислювання ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 402 каф. ][ Маг ][ 1.5р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
      ]
    },
    {
      department: '501 кафедра',
      names: [
        '[ 5 ф. ][ 501 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 501 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 126 Кібербезпека ][ Системне програмування ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 501 каф. ][ Бак ][ 4р ][ 12 інформаційні технології ][ 124 Комп`ютерні Науки ][ Системне Обчислювання ][офн][ус][ум][1н][X]',
        '[ 5 ф. ][ 501 каф. ][ Маг ][ 1.5р ][ 12 інформаційні технології ][ 123 Комп`ютерна інженерія ][ Системне програмування ][офн][ус][ум][1н][X]',
      ]
    },
  ];

  stateGroupOptions$!: Observable<SearchEP[]>;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.stateGroupOptions$ = this.epForm.get('ep')!.valueChanges.pipe(
      startWith(''),
      map(value => this._filterGroup(value || '')),
    );
  }

  private _filterGroup(value: string): SearchEP[] {
    if (value) {
      return this.educationPrograms
        .map(group => ({ department: group.department, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.educationPrograms;
  }
}
