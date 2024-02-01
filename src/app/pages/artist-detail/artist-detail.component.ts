import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../../core/services/spotify.service';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin, map } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
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

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    CardAlbumComponent,
    SkeletonComponent,
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
    this._activatedRoute.params.subscribe((params) => {
      const getArtistById = this._spotifyService.getSartistByid(params['id']);
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
  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }
  convertMsToTime(milliseconds: any) {
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;

    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(
      minutes
    )}:${this.padTo2Digits(seconds)}`;
  }

  openDialog() {
    this.dialog.open(DialogComponent);
  }
  albumDetail(album: IAlbum) {
    this.selectAlbumDetail = album;
  }
  get getUrlImageArtist() {
    return this.artist.images ? this.artist.images[0].url : '';
  }
  get getFollowerArtist() {
    return this.artist.followers ? this.artist.followers : '';
  }

  get getImagesSelectedAlbum() {
    return this.selectAlbumDetail.images[0].url;
  }
}
