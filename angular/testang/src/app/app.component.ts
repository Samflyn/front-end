import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'testang';
  // When using angular universe some browser specific api's won't work on server
  // look at package.json
  constructor(@Inject(PLATFORM_ID) private platformID) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformID)) {
      console.log(this.platformID, 'This is a browser');
    }
    if (isPlatformServer(this.platformID)) {
      console.log(this.platformID, 'This is a server');
    }
  }
}
