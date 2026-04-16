import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateLanguageDialogComponent } from './update-language-dialog.component';

describe('UpdateLanguageDialogComponent', () => {
  let component: UpdateLanguageDialogComponent;
  let fixture: ComponentFixture<UpdateLanguageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLanguageDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateLanguageDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
