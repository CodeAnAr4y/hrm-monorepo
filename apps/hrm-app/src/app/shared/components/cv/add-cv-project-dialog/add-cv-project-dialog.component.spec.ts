import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCvProjectDialogComponent } from './add-cv-project-dialog.component';

describe('AddCvProjectDialogComponent', () => {
  let component: AddCvProjectDialogComponent;
  let fixture: ComponentFixture<AddCvProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCvProjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCvProjectDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
