import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'shortDate' })
export class ShortDatePipe implements PipeTransform {
  transform(value: string | Date, format: 'short' | 'ddmmyyyy' = 'short'): string {
    if (!value) return '';
    const date = new Date(value);

    if (format === 'ddmmyyyy') {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  }
}
