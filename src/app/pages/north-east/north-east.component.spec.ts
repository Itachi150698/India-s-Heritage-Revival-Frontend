import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NorthEastComponent } from './north-east.component';

describe('NorthEastComponent', () => {
  let component: NorthEastComponent;
  let fixture: ComponentFixture<NorthEastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NorthEastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NorthEastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
