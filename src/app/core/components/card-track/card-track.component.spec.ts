import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTrackComponent } from './card-track.component';

describe('CardTrackComponent', () => {
  let component: CardTrackComponent;
  let fixture: ComponentFixture<CardTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTrackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
