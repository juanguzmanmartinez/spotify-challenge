import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpotifyServiceStore } from '../../store/spotify.service';

@Component({
  selector: 'app-card-album',
  standalone: true,
  imports: [MatCheckboxModule, FormsModule, MatButtonModule],
  templateUrl: './card-album.component.html',
  styleUrl: './card-album.component.scss',
})
export class CardAlbumComponent implements OnInit {
  @Input() album: any;
  albums: any = [];
  @Output() setAlbumDetail: EventEmitter<any> = new EventEmitter();
  ngOnInit(): void {
    this._spotifyServiceStore.getSelectedAlbums().subscribe((albums) => {
      this.albums = albums;
    });
  }
  checked: boolean = false;
  constructor(private _spotifyServiceStore: SpotifyServiceStore) {}
  selectAlbum() {
    let aaaa: any = [];

    if (this.checked) {
      aaaa = [...this.albums, this.album];
    } else {
      aaaa = this.albums.filter((album: any) => album.id !== this.album.id);
    }
    this._spotifyServiceStore.setSelectedAlbums(aaaa);
  }

  selectAlbumDetail() {
    this.setAlbumDetail.emit({ album: this.album });
  }
}
