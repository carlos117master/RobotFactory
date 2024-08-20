import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TociasPageComponent } from './tocias-page.component';

describe('TociasPageComponent', () => {
  let component: TociasPageComponent;
  let fixture: ComponentFixture<TociasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TociasPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TociasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
