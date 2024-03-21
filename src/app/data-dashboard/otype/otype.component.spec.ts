import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTypeComponent } from './otype.component';

describe('OTypeComponent', () => {
  let component: OTypeComponent;
  let fixture: ComponentFixture<OTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OTypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
