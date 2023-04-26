import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPremiosComponent } from './modal-premios.component';

describe('ModalPremiosComponent', () => {
  let component: ModalPremiosComponent;
  let fixture: ComponentFixture<ModalPremiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalPremiosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPremiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
