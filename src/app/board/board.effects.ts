import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AddBoardSuccess, BoardTypes, GetBoardSuccess, GetBoard, RemoveBoardSuccess } from '../dashboard/dashboard.actions';
import { BoardService } from './board.service';
import { BoardIdTypes, GetBoardIdSuccess, ColumnTypes, CardTypes, GetCardSucess, GetColumnsSuccess } from './board.actions';
import { Router } from '@angular/router';

@Injectable()
export class BoardEffects {

    constructor(private actions$: Actions, private store: Store,
                private boardService: BoardService, private router: Router) {
    }

    @Effect()
    addBoard$: Observable<Action> = this.actions$.pipe(
        ofType(BoardTypes.ADD_BOARD),
        mergeMap((action: any) =>
            this.boardService.post(action.payload).pipe(
                map(data => {
                    this.router.navigate(['/b', data._id]);
                    this.store.dispatch(new GetBoard());
                    return new AddBoardSuccess(data);
                }
                )
            )
        ));
      @Effect()
      deleteBoard$: Observable<Action> = this.actions$.pipe(
          ofType(BoardTypes.REMOVE_BOARD),
          mergeMap((action: any) =>
              this.boardService.delete(action.payload).pipe(
                  map(resp => {
                      window.location.reload();
                      // this.router.navigate(['']);
                      return new RemoveBoardSuccess(resp);
                  })
              )
          ));

    @Effect()
    getAllBoard$: Observable<Action> = this.actions$.pipe(
        ofType(BoardTypes.GET_BOARD),
        mergeMap(() =>
            this.boardService.getAll().pipe(
                map((resp: any) => {
                    return (new GetBoardSuccess(resp));
                })
            )
        )
    );

    @Effect()
    getBoardById$: Observable<Action> = this.actions$.pipe(
        ofType(BoardIdTypes.GET_BOARD_ID),
        mergeMap((action: any) =>
            this.boardService.get(action.payload).pipe(
                map((resp: any) => {
                    return (new GetBoardIdSuccess(resp));
                })
            )
        )
    );

    @Effect()
    getCoumns$: Observable<Action> = this.actions$.pipe(
        ofType(ColumnTypes.GET_COLUMNS),
        mergeMap((action: any) =>
            this.boardService.getColumns(action.payload).pipe(
                map((resp: any) => {
                    return (new GetColumnsSuccess(resp));
                })
            )
        )
    );

    @Effect()
    getCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.GET_CARD),
        mergeMap((action: any) =>
            this.boardService.getCards(action.payload).pipe(
                map((resp: any) => {
                    return (new GetCardSucess(resp));
                })
            )
        )
    );

}
