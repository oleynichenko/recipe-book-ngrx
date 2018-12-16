import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'recipe-book';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyD6SqurhA__hetnOoBSbb_o5sEvcJ0I4pU',
      authDomain: 'recipe-1650c.firebaseapp.com',
      databaseURL: 'https://recipe-1650c.firebaseio.com'
    });
  }
}
