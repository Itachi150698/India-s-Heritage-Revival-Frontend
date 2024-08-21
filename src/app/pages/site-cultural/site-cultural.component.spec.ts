import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCulturalComponent } from './site-cultural.component';

describe('SiteCulturalComponent', () => {
  let component: SiteCulturalComponent;
  let fixture: ComponentFixture<SiteCulturalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteCulturalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SiteCulturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
