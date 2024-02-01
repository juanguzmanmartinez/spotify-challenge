import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailArtistComponent } from './card-detail-artist.component';

describe('CardDetailArtistComponent', () => {
  let component: CardDetailArtistComponent;
  let fixture: ComponentFixture<CardDetailArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailArtistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
