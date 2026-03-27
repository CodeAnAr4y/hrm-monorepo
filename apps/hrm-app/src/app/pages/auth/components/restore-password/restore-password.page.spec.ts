import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RestorePasswordPage } from './restore-password.page';

describe('RestorePasswordPage', () => {
  let component: RestorePasswordPage;
  let fixture: ComponentFixture<RestorePasswordPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestorePasswordPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RestorePasswordPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
