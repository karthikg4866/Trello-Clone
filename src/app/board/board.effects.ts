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
import { AddBoardSuccess, BoardTypes, GetBoardSuccess, GetBoard } from '../dashboard/dashboard.actions';
import { BoardService } from './board.service';
import { BoardIdTypes, GetBoardIdSuccess, ColumnTypes, CardTypes, GetCardSucess, GetColumnsSuccess } from './board.actions';
@Injectable()
export class BoardEffects {

    constructor(private actions$: Actions, private store: Store, private boardService: BoardService) {
    }

    // Listen for the 'ADD BOARD' action
    @Effect()
    addBoard$: Observable<Action> = this.actions$.pipe(
        ofType(BoardTypes.ADD_BOARD),
        mergeMap((action: any) =>
            this.boardService.post(action.payload).pipe(
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
    getAllBoard$: Observable<Action> = this.actions$.pipe(
        ofType(BoardTypes.GET_BOARD),
        mergeMap((action: any) =>
            this.boardService.getAll().pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    return (new GetBoardSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

    @Effect()
    getBoardById$: Observable<Action> = this.actions$.pipe(
        ofType(BoardIdTypes.GET_BOARD_ID),
        mergeMap((action: any) =>
            this.boardService.get(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log("get boatd by id");
                    console.log(resp);
                    return (new GetBoardIdSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

    @Effect()
    getCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.GET_COLUMNS),
        mergeMap((action: any) =>
            this.boardService.getColumns(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log("get columns after column add");
                    console.log(resp);
                    return (new GetColumnsSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

    @Effect()
    getCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.GET_CARD),
        mergeMap((action: any) =>
            this.boardService.getAll().pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    return (new GetCardSucess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

}
