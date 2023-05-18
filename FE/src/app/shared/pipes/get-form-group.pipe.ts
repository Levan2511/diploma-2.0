import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getFormGroup'
})
export class GetFormGroupPipe implements PipeTransform {

  transform(formArr: FormArray, index: any): FormGroup {
    console.log('getFormGroup', index, formArr.at(index).value)
    return formArr.at(index) as FormGroup;
  }

}
