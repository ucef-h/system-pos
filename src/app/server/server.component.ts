import { Component } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white;
        }
    `]
  })
export class ServerComponent {
  serverId: number = 10;
  serverStatus: string = 'offline';
  serverLocation: string = 'Malta';

  constructor() {
      this.serverStatus = Math.random() > 0.5 ? 'offline' : 'online';
  }

  getServerLocation() {
      return this.serverLocation;
  }

  getColor() {
      return this.serverStatus === 'online' ? 'green' : 'red';
  }
}
