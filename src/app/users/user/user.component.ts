import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: Object = {};

  constructor(
    private router: Router,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {

    this.userService.getUserById(this.activatedRoute.snapshot.params['id'])
      .then((resp) => {
        this.user = resp;
      });
  }


  async updateUser(user: any) {

    const userID = user.id;
    delete user.id;
    this.userService.updateUser(userID, user).then((resp) => {
      if (resp){
        this.router.navigate(['users']);
      }
    });
  }

}
