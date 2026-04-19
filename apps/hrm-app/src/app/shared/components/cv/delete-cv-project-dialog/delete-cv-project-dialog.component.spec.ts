import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteCvProjectDialogComponent } from './delete-cv-project-dialog.component';

describe('DeleteCvProjectDialogComponent', () => {
  let component: DeleteCvProjectDialogComponent;
  let fixture: ComponentFixture<DeleteCvProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCvProjectDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteCvProjectDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
