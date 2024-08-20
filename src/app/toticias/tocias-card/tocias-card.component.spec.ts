import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TociasCardComponent } from './tocias-card.component';

describe('TociasCardComponent', () => {
  let component: TociasCardComponent;
  let fixture: ComponentFixture<TociasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TociasCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TociasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
