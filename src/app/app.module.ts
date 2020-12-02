import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ArtistListComponent } from './artist-list/artist-list.component'
import { BaseService } from './base.service';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: ArtistListComponent },
    ])
  ,
  HttpClientModule,
        

  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    ArtistListComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [
   BaseService,
   HttpClient
  ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/