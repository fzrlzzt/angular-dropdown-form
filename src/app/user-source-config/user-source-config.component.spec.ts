import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSourceConfigComponent } from './user-source-config.component';

describe('UserSourceConfigComponent', () => {
  let component: UserSourceConfigComponent;
  let fixture: ComponentFixture<UserSourceConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSourceConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSourceConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
