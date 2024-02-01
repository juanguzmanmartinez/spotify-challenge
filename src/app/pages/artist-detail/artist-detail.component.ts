import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin, map } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import {
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { DialogComponent } from '../../core/components/dialog/dialog.component';
import { SpotifyServiceStore } from '../../core/store/spotify.service';
import { CardAlbumComponent } from '../../core/components/card-album/card-album.component';
import { SkeletonComponent } from '../../core/components/skeleton/skeleton.component';
import {
  IAlbum,
  IArtist,
  ITrack,
} from '../../core/interfaces/spotify.interface';
import { CardDetailArtistComponent } from '../../core/components/card-detail-artist/card-detail-artist.component';
import { CardTrackComponent } from '../../core/components/card-track/card-track.component';
import { CardDetailAlbumComponent } from '../../core/components/card-detail-album/card-detail-album.component';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    CardAlbumComponent,
    SkeletonComponent,
    CardDetailArtistComponent,
    CardTrackComponent,
    CardDetailAlbumComponent,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './artist-detail.component.html',
  styleUrl: './artist-detail.component.scss',
})
export class ArtistDetailComponent implements OnInit {
  public panelOpenState = false;
  public artist!: IArtist;
  public albums: IAlbum[] = [];
  public tracks: ITrack[] = [];
  public selectedAlbums: IAlbum[] = [];
  public miFormulario!: FormGroup;
  public selectAlbumDetail!: IAlbum;
  constructor(
    private _spotifyService: SpotifyService,
    private _activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private _spotifyServiceStore: SpotifyServiceStore
  ) {}

  ngOnInit(): void {
    this._spotifyServiceStore.getSelectedAlbums().subscribe((res) => {
      this.selectedAlbums = res;
    });
    this.miFormulario = this.fb.group({
      title: ['', Validators.required],
      year: [new Date(), Validators.required],
      image: [''],
    });
    this.loadInformation();
  }

  loadInformation() {
    this._activatedRoute.params.subscribe((params) => {
      const getArtistById = this._spotifyService.getArtistByid(params['id']);
      const getArtistTracks = this._spotifyService.getArtistAlbums(
        params['id']
      );

      const getArtistAlbums = this._spotifyService.getArtistTopTracks(
        params['id']
      );
      forkJoin([getArtistById, getArtistTracks, getArtistAlbums])
        .pipe(
          map(([artist, albums, tracks]) => {
            return {
              artist: artist,
              albums: albums,
              tracks: tracks,
            };
          })
        )
        .subscribe((res) => {
          this._spotifyServiceStore.setAlbums(res.albums.items);
          this.artist = res.artist;
          this.albums = res.albums.items;
          this.tracks = res.tracks.tracks;
          this.selectAlbumDetail = this.albums[0];
        });
    });
  }
  openDialog() {
    this.dialog.open(DialogComponent);
  }
  albumDetail(album: IAlbum) {
    this.selectAlbumDetail = album;
  }
}
