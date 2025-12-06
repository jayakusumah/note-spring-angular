import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-back',
  standalone: true,
  template: `
    <svg
      [attr.width]="size"
      [attr.height]="size"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      [attr.stroke]="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="inline-block"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  `
})
export class IconBackComponent {
  @Input() size: number = 20;
  @Input() color: string = 'currentColor';
}
