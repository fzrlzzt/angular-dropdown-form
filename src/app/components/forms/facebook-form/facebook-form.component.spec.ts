import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookFormComponent } from './facebook-form.component';

describe('FacebookFormComponent', () => {
  let component: FacebookFormComponent;
  let fixture: ComponentFixture<FacebookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacebookFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
