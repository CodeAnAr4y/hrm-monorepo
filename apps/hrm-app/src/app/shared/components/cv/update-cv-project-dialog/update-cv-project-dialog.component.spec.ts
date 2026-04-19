import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateCvProjectDialogComponent } from './update-cv-project-dialog.component';

describe('UpdateCvProjectDialogComponent', () => {
  let component: UpdateCvProjectDialogComponent;
  let fixture: ComponentFixture<UpdateCvProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCvProjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCvProjectDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
