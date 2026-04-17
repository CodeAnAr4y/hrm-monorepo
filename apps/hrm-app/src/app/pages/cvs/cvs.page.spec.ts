import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CvsPage } from './cvs.page';

describe('CvsPage', () => {
  let component: CvsPage;
  let fixture: ComponentFixture<CvsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CvsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
