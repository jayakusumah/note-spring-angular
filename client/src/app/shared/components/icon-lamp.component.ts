import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-lamp',
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
      class="inline-block">
      <path d="M9 18h6M12 2a6 6 0 0 0-6 6c0 3 3 6 3 6h6s3-3 3-6a6 6 0 0 0-6-6z"/>
    </svg>
  `
})
export class IconLampComponent {
  @Input() size: number = 20;
  @Input() color: string = 'currentColor';
}
