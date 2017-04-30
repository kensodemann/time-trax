import { Pipe, PipeTransform } from '@angular/core';

import { Stage } from '../../data/models/stage';

@Pipe({
  name: 'stage'
})
export class StagePipe implements PipeTransform {

  transform(value: Stage): string {
    if (!value) {
      return '';
    }

    return `${value.name} [${value.stageNumber}]`;
  }

}
