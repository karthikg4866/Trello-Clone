import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ColumnService } from './column.service';
import { ColumnTypes, AddColumnSuccess, GetColumns, GetColumnsSuccess, UpdateColumnSuccess } from './../board/board.actions';
@Injectable()
export class ColumnEffects {

    constructor(private actions$: Actions, private store: Store, private columnService: ColumnService) {
    }

    @Effect()
    addCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.ADD_COLUMNS),
        mergeMap((action: any) =>
            this.columnService.post(action.payload).pipe(
                map((resp: any) => {
                    this.store.dispatch(new GetColumns(resp.boardId));
                    return (new AddColumnSuccess(resp));
                })
            )
        )
    );

    @Effect()
    updateCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.UPDATE_COLUMNS),
        mergeMap((action: any) =>
            this.columnService.put(action.payload).pipe(
                map((resp: any) => {
                    // this.store.dispatch(new GetColumns(resp.boardId));
                    return (new UpdateColumnSuccess(resp));
                })
            )
        )
    );


    @Effect()
    getCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.GET_COLUMNS),
        mergeMap((action: any) =>
            this.columnService.get(action.payload).pipe(
                map((resp: any) => {
                    return (new GetColumnsSuccess(resp));
                })
            )
        )
    );

}
