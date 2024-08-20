import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotMenuComponent } from './robot-menu.component';

describe('RobotMenuComponent', () => {
  let component: RobotMenuComponent;
  let fixture: ComponentFixture<RobotMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
