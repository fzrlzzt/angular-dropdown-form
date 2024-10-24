import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceAttributesComponent } from './source-attributes.component';

describe('SourceAttributesComponent', () => {
  let component: SourceAttributesComponent;
  let fixture: ComponentFixture<SourceAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SourceAttributesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
