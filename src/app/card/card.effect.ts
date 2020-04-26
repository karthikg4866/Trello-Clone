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
import { CardService } from './card.service';
import { BoardIdTypes, GetBoardIdSuccess, ColumnTypes, CardTypes, GetCardSucess, AddColumnSuccess, GetColumns, GetColumnsSuccess, GetCard, AddCardSuccess, UpdateCardSuccess } from './../board/board.actions';
@Injectable()
export class CardEffects {

    constructor(private actions$: Actions, private store: Store, private cardService: CardService) {
    }

    @Effect()
    addCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.ADD_CARD),
        mergeMap((action: any) =>
            this.cardService.post(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log(resp);
                    console.log("card service...............")
                    this.store.dispatch(new GetCard(resp.boardId));
                    return (new AddCardSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );

    @Effect()
    updateCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.UPDATE_CARD),
        mergeMap((action: any) =>
            this.cardService.put(action.payload).pipe(
                // If successful, dispatch success action with result
                map((resp: any) => {
                    console.log(resp);
                    console.log("card service...............")
                   // this.store.dispatch(new GetCard(resp.boardId));
                    return (new UpdateCardSuccess(resp))
                })
                // If request fails, dispatch failed action
                // catchError(() => of({ type: 'FAILED' }))
            )
        )
    );
}
