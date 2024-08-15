import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplaceCharWithService implements PipeTransform {
  transform(value: string, search: string, replace: string): string {
    return value.replaceAll(search, replace);
  }
}
