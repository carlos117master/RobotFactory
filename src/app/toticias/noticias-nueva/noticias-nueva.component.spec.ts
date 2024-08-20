import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticiasNuevaComponent } from './noticias-nueva.component';

describe('NoticiasNuevaComponent', () => {
  let component: NoticiasNuevaComponent;
  let fixture: ComponentFixture<NoticiasNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoticiasNuevaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoticiasNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
