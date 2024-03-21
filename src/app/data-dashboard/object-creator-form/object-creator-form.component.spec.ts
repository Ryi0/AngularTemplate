import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCreatorFormComponent } from './object-creator-form.component';

describe('ObjectCreatorFormComponent', () => {
  let component: ObjectCreatorFormComponent;
  let fixture: ComponentFixture<ObjectCreatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectCreatorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
