import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDetailAlbumComponent } from './card-detail-album.component';

describe('CardDetailAlbumComponent', () => {
  let component: CardDetailAlbumComponent;
  let fixture: ComponentFixture<CardDetailAlbumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDetailAlbumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardDetailAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
