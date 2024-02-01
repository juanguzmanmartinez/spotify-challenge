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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = this.fb.group({
      title: ['', Validators.required],
      year: [new Date(), Validators.required],
      image: [''], // Valor por defecto
    });
  }

  onSubmit() {
    const newAlbum = {
      name: this.form.value.title,
      year: '2012-01-12',
      images: [{ url: this.form.value.image }],
    };
    this._spotifyServiceStore.setAlbum(newAlbum);
  }
}
