import { Component, ViewChild } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';

import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss',
})
export class ArtistListComponent {
  value: string = '';
  appearTable: boolean = false;
  title = 'spotify-angular';
  displayedColumns: string[] = ['position', 'name', 'images', 'actions'];

  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _spotifyService: SpotifyService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  searchArtists() {
    this._spotifyService.genericGet(this.value).subscribe((res) => {
      this.appearTable = true;
      this.dataSource.data = res.artists.items.map((item: any, index: any) => {
        return { ...item, position: index + 1 };
      });
    });
  }

  getImageUrl(element: any) {
    if (element && element.images.length > 0) {
      return element.images[0].url ? element.images[0].url : '';
    } else {
      return false;
    }
  }
  goToDetail(element: any) {
    this._router.navigate([`artist/${element.id}`]);
  }
}
