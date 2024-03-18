import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondToolComponent } from './second-tool.component';

describe('SecondToolComponent', () => {
  let component: SecondToolComponent;
  let fixture: ComponentFixture<SecondToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondToolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecondToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
