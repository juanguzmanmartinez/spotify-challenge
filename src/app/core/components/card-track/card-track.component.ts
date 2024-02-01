import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-card-track',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './card-track.component.html',
  styleUrl: './card-track.component.scss',
})
export class CardTrackComponent {
  @Input() track!: any;
  @Input() index!: number;

  padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }
  convertMsToTime() {
    let seconds = Math.floor(this.track.duration_ms / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    seconds = seconds % 60;
    minutes = minutes % 60;

    hours = hours % 24;

    return `${this.padTo2Digits(hours)}:${this.padTo2Digits(
      minutes
    )}:${this.padTo2Digits(seconds)}`;
  }
}
