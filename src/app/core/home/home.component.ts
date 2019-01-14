import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';

import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  startExploring() {
    this.store.select('auth')
      .subscribe((authState: fromAuth.State) => {
        if (authState.authenticated) {
          this.router.navigate(['/recipes']);
        } else {
          this.router.navigate(['/signin']);
        }
      });
  }
}
