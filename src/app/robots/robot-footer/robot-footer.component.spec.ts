import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotFooterComponent } from './robot-footer.component';

describe('RobotFooterComponent', () => {
  let component: RobotFooterComponent;
  let fixture: ComponentFixture<RobotFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
