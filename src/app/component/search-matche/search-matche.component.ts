import { Component } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatchService } from '../../services/match.service';
import { ResultComponent } from "../result/result.component";

@Component({
  selector: 'app-search-matche',
  imports: [NgIf, ReactiveFormsModule, NgForOf, ResultComponent],
  templateUrl: './search-matche.component.html',
  styleUrl: './search-matche.component.css'
})
export class SearchMatcheComponent {
searchForm!: FormGroup;
 matcheData: any;
errorMsg = "";

constructor(private fb: FormBuilder , private matcheService :MatchService ) {}
 ngOnInit() {
    this.searchForm = this.fb.group({
      team: ['', Validators.required]
    });
  }
onSearch() {
  if (this.searchForm.invalid) {
    return;
  }

  this.matcheService.searchMatch(this.searchForm.value).subscribe(
    (res) => {
      if (res.msg) {
        this.matcheData = null;
        this.errorMsg = res.msg;
      } else {
        this.matcheData = res.matches;
        this.errorMsg = '';
        console.log('here are matches searched', this.matcheData);
      }
    },
    () => {
      this.errorMsg = 'Erreur serveur';
    }
  );
}
}
