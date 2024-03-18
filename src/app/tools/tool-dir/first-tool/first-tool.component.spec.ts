import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstToolComponent } from './first-tool.component';

describe('FirstToolComponent', () => {
  let component: FirstToolComponent;
  let fixture: ComponentFixture<FirstToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirstToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
