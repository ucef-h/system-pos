import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers', // [app-servers ]
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})

export class ServersComponent {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'No Server Created';
  serverName: string;
  serverCreated: boolean = false
  servers: string[] = [ 'Production', 'UAT', 'Dev' ];

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true
    }, 2000);
  }

  onCreateServer() {
    this.serverCreationStatus = 'Server Creatded! Name is ' + this.serverName;
    this.servers.push(this.serverName);
    this.serverCreated = true;
  }

}
