import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { CardService } from './card.service';
import { CardTypes, GetCard, AddCardSuccess, UpdateCardSuccess } from './../board/board.actions';
@Injectable()
export class CardEffects {

    constructor(private actions$: Actions, private store: Store, private cardService: CardService) {
    }

    @Effect()
    addCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.ADD_CARD),
        mergeMap((action: any) =>
            this.cardService.post(action.payload).pipe(
                map((resp: any) => {
                    this.store.dispatch(new GetCard(resp.boardId));
                    return (new AddCardSuccess(resp));
                })
            )
        )
    );

    @Effect()
    updateCard$: Observable<Action> = this.actions$.pipe(
        ofType(CardTypes.UPDATE_CARD),
        mergeMap((action: any) =>
            this.cardService.put(action.payload).pipe(
                map((resp: any) => {
                   // this.store.dispatch(new GetCard(resp.boardId));
                    return (new UpdateCardSuccess(resp));
                })
            )
        )
    );
}
