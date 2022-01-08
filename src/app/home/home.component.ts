import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , OnDestroy {

  private firstObsSubscription: Subscription;
  private secondObsSubscription: Subscription;
  constructor(
    private router: Router, 
    private authService: AuthService,
    ) { }


  ngOnInit() {
    this.firstObsSubscription = interval(10000).subscribe( count => {
      console.log(count);
    });

    const customIntervalObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count ++;

        if(count == 2) {
          observer.complete();
        }
        if(count == 4) {
          observer.error(new Error(' count Greater Than three'));
        }
      }, 9000);
    });

    ;

    this.secondObsSubscription = customIntervalObservable.pipe(map( (data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(count => {
        console.log("second Count: " + count);
      }, error => {
        console.log(error);
      }, () => {
        console.log("Completed remove the complete to see the error at 4 ");
      }
    );

  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
    this.secondObsSubscription.unsubscribe();
  }

  onLoadServers(id: number) {
    this.router.navigate(['/servers', id, 'edit'],  {queryParams : {allowEdit: 1}});
  }

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
