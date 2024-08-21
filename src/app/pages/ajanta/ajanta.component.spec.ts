import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjantaComponent } from './ajanta.component';

describe('AjantaComponent', () => {
  let component: AjantaComponent;
  let fixture: ComponentFixture<AjantaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjantaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjantaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
