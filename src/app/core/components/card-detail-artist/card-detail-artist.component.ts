import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { IArtist } from '../../interfaces/spotify.interface';

@Component({
  selector: 'app-card-detail-artist',
  standalone: true,
  imports: [MatChipsModule, MatIconModule],
  templateUrl: './card-detail-artist.component.html',
  styleUrl: './card-detail-artist.component.scss',
})
export class CardDetailArtistComponent {
  @Input() artist!: IArtist;

  get getUrlImageArtist() {
    return this.artist.images ? this.artist.images[0].url : '';
  }
  get getFollowerArtist() {
    return this.artist.followers ? this.artist.followers : '';
  }
}
