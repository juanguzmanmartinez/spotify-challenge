import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() rows = 3;
  @Input() columns = 3;
  getRowArray(): number[] {
    return new Array(this.rows);
  }

  getColumnArray(): number[] {
    return new Array(this.columns);
  }
}
