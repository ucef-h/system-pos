import { Component, OnInit } from '@angular/core';
import { AccountService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService]
})
export class AppComponent implements OnInit {

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accounts = this.accountService.accounts;
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

}
