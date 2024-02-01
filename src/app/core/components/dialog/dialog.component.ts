import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { SpotifyServiceStore } from '../../store/spotify.service';
import { IAlbum } from '../../interfaces/spotify.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _spotifyServiceStore: SpotifyServiceStore
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      year: [new Date(), Validators.required],
      image: [''], // Valor por defecto
    });
  }

  onSubmit() {
    type AlbumPreview = Pick<IAlbum, 'name' | 'release_date' | 'images'>;

    const newAlbum: AlbumPreview = {
      name: this.form.value.title,
      release_date: this.form.value.year,
      images: [{ url: this.form.value.image }],
    };

    this._spotifyServiceStore.setAlbum(newAlbum);
  }
}
