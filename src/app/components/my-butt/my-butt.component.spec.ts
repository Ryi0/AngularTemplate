import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyButtComponent } from './my-butt.component';

describe('MyButtComponent', () => {
  let component: MyButtComponent;
  let fixture: ComponentFixture<MyButtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyButtComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyButtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
