import { Component } from "@angular/core";
import { OnInit } from "@angular/core";
import { ArtistListService } from "./artist-list.service";

@Component({
  selector: "artist-list",
  templateUrl: "./artist-list.component.html",
  styleUrls: ["./artist-list.component.css"]
})
export class ArtistListComponent implements OnInit {
  constructor(public artistService: ArtistListService) {

  }

  ngOnInit() {
    this.artistService.logIn();
  }

  // share() {
  //   window.alert('The product has been shared!');
  // }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
