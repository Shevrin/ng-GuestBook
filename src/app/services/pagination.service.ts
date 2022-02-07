import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PaginatonService implements MatPaginatorIntl {
  changes = new Subject<void>();
  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `First page`;
  itemsPerPageLabel = `Число постов на странице:`;
  lastPageLabel = `Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Следующая';
  previousPageLabel = 'Предыдущая';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Нет постов`;
    }

    if (length < pageSize && page === 0) {
      return `Страница 1 из 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Страница ${page + 1} из ${amountPages}`;
  }
}
