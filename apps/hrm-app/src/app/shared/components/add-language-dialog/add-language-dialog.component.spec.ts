import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddLanguageDialogComponent } from './add-language-dialog.component';

describe('AddLanguageDialogComponent', () => {
  let component: AddLanguageDialogComponent;
  let fixture: ComponentFixture<AddLanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLanguageDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLanguageDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
