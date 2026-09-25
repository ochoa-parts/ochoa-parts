import { Pipe, PipeTransform } from '@angular/core';

const FORMATTER = new Intl.NumberFormat('es-VE', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats an already-computed amount. Never performs currency conversion. */
@Pipe({ name: 'money' })
export class MoneyPipe implements PipeTransform {
  transform(value: number, currency: 'USD' | 'Bs'): string {
    return `${currency} ${FORMATTER.format(value)}`;
  }
}
