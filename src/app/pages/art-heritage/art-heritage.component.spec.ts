import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtHeritageComponent } from './art-heritage.component';

describe('ArtHeritageComponent', () => {
  let component: ArtHeritageComponent;
  let fixture: ComponentFixture<ArtHeritageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtHeritageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtHeritageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
