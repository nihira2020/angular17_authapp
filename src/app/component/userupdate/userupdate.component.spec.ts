import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserupdateComponent } from './userupdate.component';

describe('UserupdateComponent', () => {
  let component: UserupdateComponent;
  let fixture: ComponentFixture<UserupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
