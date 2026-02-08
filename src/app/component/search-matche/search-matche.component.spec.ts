import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatcheComponent } from './search-matche.component';

describe('SearchMatcheComponent', () => {
  let component: SearchMatcheComponent;
  let fixture: ComponentFixture<SearchMatcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchMatcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMatcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
