import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { HttpClientService } from '../httpclient';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AddBoard, AddBoardSuccess, boardActions, BoardTypes, GetBoardSuccess, GetBoard } from '../dashboard/dashboard.actions';
@Injectable()
export class BoardService {
  apiUrl = '/board';
  boardsCache: Board[] = [];

  constructor(private http: HttpClientService, private actions$: Actions, private store: Store) {
  }

  // Listen for the 'ADD BOARD' action
  @Effect()
  addBoard$: Observable<Action> = this.actions$.pipe(
    ofType(BoardTypes.ADD_BOARD),
    mergeMap((action: any) =>
      this.http.post(this.apiUrl, action.payload).pipe(
        // If successful, dispatch success action with result
        map(data => {
          this.store.dispatch(new GetBoard())
          return new AddBoardSuccess(data)
        }
          // If request fails, dispatch failed action
          // catchError(() => of({ type: 'FAILED' }))
        )
      )
    ));

  // Listen for the 'GET BOARD' action
  @Effect()
  getBoard$: Observable<Action> = this.actions$.pipe(
    ofType(BoardTypes.GET_BOARD),
    mergeMap((action: any) =>
      this.http.get(this.apiUrl).pipe(
        // If successful, dispatch success action with result
        map((resp: any) => {
          return (new GetBoardSuccess(resp.data))
        }),
        // If request fails, dispatch failed action
        // catchError(() => of({ type: 'FAILED' }))
      )
    )
  );

  getAll() {
    return this.http.get(this.apiUrl).pipe(map((res: any) => res.data as Board[]));
  }

  get(id: string) {
    return this.http.get(this.apiUrl + '/' + id).pipe(
      map((res: any) => res.data as Board));
  }

  getBoardWithColumnsAndCards(id: string) {
    return forkJoin(this.get(id), this.getColumns(id), this.getCards(id));
  }

  getColumns(id: string) {
    return this.http.get(this.apiUrl + '/' + id + '/columns').pipe(
      map((res: any) => res.data as Column[]));
  }

  getCards(id: string) {
    return this.http.get(this.apiUrl + '/' + id + '/cards').pipe(
      map((res: any) => res.data as Card[]));
  }

  put(board: Board) {
    const body = JSON.stringify(board);
    this.http.put(this.apiUrl + '/' + board._id, body)
      .toPromise()
      .then(res => console.log(res));
  }

  // post(board: Board) {
  //   const body = JSON.stringify(board);
  //   return this.http.post(this.apiUrl, body).pipe(
  //     map((res: any) => res.data as Board));
  // }

  delete(board: Board) {
    this.http.delete(this.apiUrl + '/' + board._id)
      .toPromise()
      .then(res => console.log(res));
  }

}
