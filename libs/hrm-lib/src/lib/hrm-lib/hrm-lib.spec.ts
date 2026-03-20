import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HrmLib } from './hrm-lib';

describe('HrmLib', () => {
  let component: HrmLib;
  let fixture: ComponentFixture<HrmLib>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HrmLib],
    }).compileComponents();

    fixture = TestBed.createComponent(HrmLib);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
