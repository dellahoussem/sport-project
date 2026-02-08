import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(tab: any[], search: string): any[]  {

    if (!tab || !search) {
      return tab;
    }

    search = search.toLowerCase();

    return tab.filter(match =>
      match.teamOne.toLowerCase().includes(search) ||
      match.teamTow.toLowerCase().includes(search)
    );

  }

}
