import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AddBoard, GetBoard } from './dashboard.actions';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  boards$: Observable<any>;
  listOfBoards: any[] = [];
  constructor(private store: Store<AppState>, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new GetBoard());
    this.store.select('dashboard').subscribe(data => {
      this.listOfBoards = data.listOfBoards;
    });
    setTimeout(() => {
      document.getElementById('content-wrapper').style.backgroundColor = '#fff';
    }, 100);
  }

  public addBoard() {
    this.store.dispatch(new AddBoard({ title: 'New board' }));
    // this.router.navigate(['/b', ._id]);
  }

}
