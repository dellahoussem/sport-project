import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMatcheComponent } from './edit-matche.component';

describe('EditMatcheComponent', () => {
  let component: EditMatcheComponent;
  let fixture: ComponentFixture<EditMatcheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMatcheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMatcheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
