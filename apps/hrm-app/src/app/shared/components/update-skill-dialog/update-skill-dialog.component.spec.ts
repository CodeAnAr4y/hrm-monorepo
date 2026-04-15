import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateSkillDialogComponent } from './update-skill-dialog.component';

describe('UpdateSkillDialogComponent', () => {
  let component: UpdateSkillDialogComponent;
  let fixture: ComponentFixture<UpdateSkillDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSkillDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateSkillDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
