import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcustomerComponent } from './addcustomer.component';

describe('AddcustomerComponent', () => {
  let component: AddcustomerComponent;
  let fixture: ComponentFixture<AddcustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddcustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddcustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
