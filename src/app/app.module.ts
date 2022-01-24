import { NgModule } from '@angular/core';
import { Subject } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { PostsComponent } from './components/posts/posts.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PaginatorserviceService } from './paginatorservice.service';
@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    FormComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorserviceService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
