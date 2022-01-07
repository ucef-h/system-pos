import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  changesSaved = false;

  constructor(private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    // listen to route change
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activatedRoute});
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved ) {
      return confirm(' Are you sure to discard');
    }else {
      return true;
    }
     
  }

}
