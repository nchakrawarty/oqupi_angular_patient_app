import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addcenter'
})
export class AddcenterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
