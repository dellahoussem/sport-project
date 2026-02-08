import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'voyelles'
})
export class VoyellesPipe implements PipeTransform {

  transform(ch : string) {
   let tab:any=["a","e","i","u","o","y",'A','E','I','O','U','Y'];
   let result :String ="";
    for (let i = 0; i < ch.length; i++) {
      let estVoyelle = false;

      for (let j = 0; j < tab.length; j++) {
        if (ch[i] == tab[j]) {
          estVoyelle = true;
          break;
        }
      }

      if (estVoyelle) {
        result += "*";
      } else {
        result += ch[i];
      }
    }

return result;
  }

}
