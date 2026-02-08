import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(ch:string)  {
let chInv:string="";
for (let i = 0; i < ch.length; i++) {
  chInv=ch[i] + chInv;
}
   return chInv;
  }

}
