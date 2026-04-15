import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkillIndicatorComponent } from './skill-indicator.component';

describe('SkillIndicatorComponent', () => {
  let component: SkillIndicatorComponent;
  let fixture: ComponentFixture<SkillIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillIndicatorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
