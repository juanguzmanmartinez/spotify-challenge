import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IAlbum } from '../interfaces/spotify.interface';

@Injectable({
  providedIn: 'root',
})
export class SpotifyServiceStore {
  private albumsSubject = new BehaviorSubject<IAlbum[]>([]);
  albumsSubject$ = this.albumsSubject.asObservable();

  private selectedAlbumsSubject = new BehaviorSubject<IAlbum[]>([]);
  selectedAlbumsSubject$ = this.selectedAlbumsSubject.asObservable();

  getAlbums() {
    return this.albumsSubject.getValue();
  }
  setAlbums(albums: IAlbum[]) {
    this.albumsSubject.next(albums);
  }
  setAlbum(album: IAlbum) {
    const albums = this.albumsSubject.getValue();
    albums.push(album);
    this.albumsSubject.next(albums);
  }

  getSelectedAlbums() {
    return this.selectedAlbumsSubject$;
  }
  setSelectedAlbums(albums: IAlbum[]) {
    this.selectedAlbumsSubject.next(albums);
  }
}
