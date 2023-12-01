import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false, // filters by default won't execute when data in page changes
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterText: string, ...args: unknown[]): unknown {
    const resultArray = [];
    if (value.length === 0 || filterText === '') {
      return value;
    } else {
      for (const item of value) {
        if (item === filterText) {
          resultArray.push(item);
        }
      }
      return resultArray;
    }
  }
}
