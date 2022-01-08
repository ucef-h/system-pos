import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService
    ) { }

  ngOnInit() {
    this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name:  this.activatedRoute.snapshot.params['name']
    };

    this.activatedRoute.params.subscribe(
      (params: Params) => { 
        this.user.id = params['id'];
        this.user.name = params['name'];
      } 
    );
  }


  onActivate() {
    this.userService.activatedEmitter.next(true);
  }

}
