import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getFormGroup'
})
export class GetFormGroupPipe implements PipeTransform {

  transform(formArr: FormArray, index: any): FormGroup {
    return formArr.at(index) as FormGroup;
  }

}
