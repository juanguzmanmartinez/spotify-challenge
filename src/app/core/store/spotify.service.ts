import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyServiceStore {
  private albumsSubject = new BehaviorSubject<any[]>([]);
  albumsSubject$ = this.albumsSubject.asObservable();

  private selectedAlbumsSubject = new BehaviorSubject<any[]>([]);
  selectedAlbumsSubject$ = this.selectedAlbumsSubject.asObservable();

  getAlbums() {
    return this.albumsSubject.getValue();
  }
  setAlbums(albums: any) {
    this.albumsSubject.next(albums);
  }
  setAlbum(album: any) {
    const albums = this.albumsSubject.getValue();
    albums.push(album);
    this.albumsSubject.next(albums);
  }

  getSelectedAlbums() {
    return this.selectedAlbumsSubject$;
  }
  setSelectedAlbums(albums: any) {
    this.selectedAlbumsSubject.next(albums);
  }
}
