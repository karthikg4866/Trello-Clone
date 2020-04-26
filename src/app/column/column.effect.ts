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
import { ColumnService } from './column.service';
import { BoardIdTypes, GetBoardIdSuccess, ColumnTypes, CardTypes, GetCardSucess, AddColumnSuccess, GetColumns, GetColumnsSuccess, UpdateColumnSuccess } from './../board/board.actions';
@Injectable()
export class ColumnEffects {

    constructor(private actions$: Actions, private store: Store, private columnService: ColumnService) {
    }

    @Effect()
    addCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.ADD_COLUMNS),
        mergeMap((action: any) =>
            this.columnService.post(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log(resp);
                    console.log("column service...............")
                    this.store.dispatch(new GetColumns(resp.boardId));
                    return (new AddColumnSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

    @Effect()
    updateCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.UPDATE_COLUMNS),
        mergeMap((action: any) =>
            this.columnService.put(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log(resp);
                    console.log("column service...............")
                    // this.store.dispatch(new GetColumns(resp.boardId));
                    return (new UpdateColumnSuccess(resp))
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
            this.columnService.get(action.payload).pipe(
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

}
