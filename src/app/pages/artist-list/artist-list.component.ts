import { Component, ViewChild } from '@angular/core';
import { SpotifyService } from '../../core/services/spotify.service';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IArtist } from '../../core/interfaces/spotify.interface';

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    CommonModule,
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
  displayedColumns: string[] = ['position', 'name', 'images', 'actions'];

  dataSource = new MatTableDataSource<IArtist>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private _spotifyService: SpotifyService,
    private _router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  searchArtists() {
    this._spotifyService.getArtistList(this.value).subscribe((res) => {
      this.appearTable = true;
      this.dataSource.data = res.artists.items.map(
        (item: IArtist, index: number) => {
          return { ...item, position: index + 1 };
        }
      );
    });
  }

  getImageUrl(element: IArtist) {
    if (element.images && element.images.length > 0) {
      return element.images[0].url ? element.images[0].url : '';
    } else {
      return 'https://www.yiwubazaar.com/resources/assets/images/default-product.jpg';
    }
  }
  goToDetail(element: IArtist) {
    this._router.navigate([`artist/${element.id}`]);
  }
}
