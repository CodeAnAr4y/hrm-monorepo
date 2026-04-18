import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCvDialogComponent } from './add-cv-dialog.component';

describe('AddCvDialogComponent', () => {
  let component: AddCvDialogComponent;
  let fixture: ComponentFixture<AddCvDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCvDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCvDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
