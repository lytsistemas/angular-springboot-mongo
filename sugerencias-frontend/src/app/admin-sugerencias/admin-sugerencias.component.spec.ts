import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSugerenciasComponent } from './admin-sugerencias.component';

describe('AdminSugerenciasComponent', () => {
  let component: AdminSugerenciasComponent;
  let fixture: ComponentFixture<AdminSugerenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSugerenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSugerenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
