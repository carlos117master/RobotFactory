import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RobotDetalleComponent } from './robot-detalle.component';

describe('RobotDetalleComponent', () => {
  let component: RobotDetalleComponent;
  let fixture: ComponentFixture<RobotDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RobotDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RobotDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
