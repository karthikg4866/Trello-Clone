import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BoardService} from '../board/board.service';
import {Board} from '../board/board';
import { Store, select } from '@ngrx/store';
import { AddBoard, GetBoard } from './dashboard.actions';
import * as dashboardReducer from './dashboard.reducer';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // boards$: Observable<any>;
  listOfBoards: any[] = []
  constructor(private bs: BoardService, private router: Router, private store: Store<AppState>) {
    // this.store.select(state => state).subscribe(val => console.log(val));
  }

  ngOnInit() {
    this.store.dispatch(new GetBoard());
    this.store.select('dashboard').subscribe(data => {
      this.listOfBoards = data.listOfBoards;
    });

    // this.bs.getAll().subscribe((boards: Board[]) => {
    //   this.boards = boards;
    // });
    setTimeout(() => {
      document.getElementById('content-wrapper').style.backgroundColor = '#fff';
    }, 100);
  }

  public addBoard() {
    console.log('Adding new board');
    // this.bs.post({ title: 'New board' } as Board)
    //   .subscribe((board: Board) => {
    //     this.router.navigate(['/b', board._id]);
    //     // console.log('new board added');
    //   });
    this.store.dispatch(new AddBoard({ title: 'New board' }));
  }

}
