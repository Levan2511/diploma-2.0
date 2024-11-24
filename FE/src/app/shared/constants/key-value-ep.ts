import { DisplayColumn, DisplayColumnExtended } from "../../../../../libs/models/education-plan";
import { columnHeadersMapForExcel } from "../../view-ep/components/table/table-data";

export const displayedColumns: DisplayColumnExtended[] = [
    {
      key: 'exam',
      name: 'Іспити',
    },
    {
      key: 'test',
      name: 'Заліки',
    },
    {
      key: 'test2',
      name: 'Диф. Заліки',
    },
    {
      key: 'RGR',
      name: 'РГР',
    },
    {
      key: 'RR',
      name: 'РР',
    },
    {
      key: 'RK',
      name: 'РК',
    },
    {
      key: 'KR',
      name: 'КР',
    },
    {
      key: 'KP',
      name: 'КП',
    },
    {
      key: 'lectures',
      name: columnHeadersMapForExcel.lectures,
    },
    {
      key: 'lectures1',
      name: columnHeadersMapForExcel.lectures1,
    },
    {
      key: 'lectures2',
      name: columnHeadersMapForExcel.lectures2,
    },
    {
      key: 'practical',
      name: columnHeadersMapForExcel.practical,
    },
    {
      key: 'practical1',
      name: columnHeadersMapForExcel.practical1,
    },
    {
      key: 'practical2',
      name: columnHeadersMapForExcel.practical2,
    },
    {
      key: 'labs',
      name: columnHeadersMapForExcel.labs,
    },
    {
      key: 'labs1',
      name: columnHeadersMapForExcel.labs1,
    },
    {
      key: 'labs2',
      name: columnHeadersMapForExcel.labs2,
    },
    {
      key: 'classHours',
      name: columnHeadersMapForExcel.classHours,
    },
    {
      key: 'selfWork',
      name: columnHeadersMapForExcel.selfWork,
    },
    {
      key: 'totalHours',
      name: columnHeadersMapForExcel.totalHours,
    },
    {
      key: 'credits',
      name: columnHeadersMapForExcel.credits,
    },
  ];

  export const controlLabelMap = [
    ...displayedColumns,
    {
      key: 'cycle',
      value: 'Цикл',
    },
    {
      key: 'term',
      value: 'Семестр',
    },
    {
      key: 'name',
      value: 'Навчальна дисципліна',
    },
    {
      key: 'department',
      value: 'Кафедра',
    },
  ]