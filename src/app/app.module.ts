import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
import { PaginatonService } from './services/pagination.service';
@NgModule({
  declarations: [AppComponent, PostsComponent, FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatonService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
