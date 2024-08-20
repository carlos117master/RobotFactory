import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotNuevoComponent } from './robot-nuevo.component';

describe('RobotNuevoComponent', () => {
  let component: RobotNuevoComponent;
  let fixture: ComponentFixture<RobotNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotNuevoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
