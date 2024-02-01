import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly url_base = environment.URL_BASE;
  constructor(private http: HttpClient) {}

  public getArtistList(value: string): Observable<any> {
    return this.http.get<any>(`${this.url_base}/search`, {
      params: {
        type: 'artist',
        limit: '50',
        q: `${value}`,
      },
    });
  }

  public getArtistByid(id: string): Observable<any> {
    return this.http.get<any>(`${this.url_base}/artists/${id}`);
  }

  public getArtistAlbums(id: string): Observable<any> {
    return this.http.get<any>(`${this.url_base}/artists/${id}/albums`, {
      params: {
        market: 'es',
        limit: 10,
      },
    });
  }

  public getArtistTopTracks(id: string): Observable<any> {
    return this.http.get<any>(`${this.url_base}/artists/${id}/top-tracks`, {
      params: {
        market: 'es',
      },
    });
  }
}
