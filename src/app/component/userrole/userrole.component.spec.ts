import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserroleComponent } from './userrole.component';

describe('UserroleComponent', () => {
  let component: UserroleComponent;
  let fixture: ComponentFixture<UserroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
