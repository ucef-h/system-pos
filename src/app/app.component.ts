import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from './services/accounts.service';
import { UserService } from './users/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private accountService: AccountService,
    private userService: UserService
    ) {}


  ngOnInit(): void {
    this.accounts = this.accountService.accounts;

    this. activatedSubject = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    });
  }
 
  ngOnDestroy(): void {
    this.activatedSubject.unsubscribe();
  }

  /************************************************************/
  serverElements = [
    { type : 'server', name: 'TestServer', content: 'Just a test'}
  ];

  onServerAdded(serverData: {serverName: string, serverContent: string} ) {
    this.serverElements.push({
      type: 'server',
      name: serverData.serverName,
      content: serverData.serverContent
    });
  }

  onBlueprintAdded(bluePrintData: {serverName: string, serverContent: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: bluePrintData.serverName,
      content: bluePrintData.serverContent
    });
  }

  /************************************************************/

  accounts: {name: string, status: string}[] = [];

  /************************************************************/

  userActivated = false;

  private activatedSubject: Subscription;
}
