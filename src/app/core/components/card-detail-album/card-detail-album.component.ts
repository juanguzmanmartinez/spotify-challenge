import { Component, Input } from '@angular/core';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { IAlbum } from '../../interfaces/spotify.interface';

@Component({
  selector: 'app-card-detail-album',
  standalone: true,
  imports: [SkeletonComponent],
  templateUrl: './card-detail-album.component.html',
  styleUrl: './card-detail-album.component.scss',
})
export class CardDetailAlbumComponent {
  @Input() selectAlbumDetail!: IAlbum;

  get getImagesSelectedAlbum() {
    return this.selectAlbumDetail.images[0].url;
  }
}
