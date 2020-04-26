import { Action } from '@ngrx/store';

export enum CardTypes {
    GET_CARD = 'GET_CARD',
    GET_CARD_SUCCESS = 'GET_CARD_SUCCESS',
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS',
    REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS',
    UPDATE_CARD = 'UPDATE_CARD',
    UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS',
}

export class GetCard implements Action {
    readonly type = CardTypes.GET_CARD;
    constructor() { }
}

export class GetCardSuccess implements Action {
    readonly type = CardTypes.GET_CARD_SUCCESS;
    constructor(public payload: any) { }
}
export class AddCard implements Action {
    readonly type = CardTypes.ADD_CARD;
    constructor(public payload: any) { }
}

export class RemoveCard implements Action {
    readonly type = CardTypes.REMOVE_CARD;
    constructor(public payload: any) { }
}

export class AddCardSuccess implements Action {
    readonly type = CardTypes.ADD_CARD_SUCCESS;
    constructor(public payload: any) { }
}

export class RemoveCardSuccess implements Action {
    readonly type = CardTypes.REMOVE_CARD_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateCard implements Action {
  readonly type = CardTypes.UPDATE_CARD;
  constructor(public payload: any) { }
}

export class UpdateCardSuccess implements Action {
  readonly type = CardTypes.UPDATE_CARD_SUCCESS;
  constructor(public payload: any) { }
}

export type cardActions =  GetCard | GetCardSuccess| AddCard | RemoveCard
                          | AddCardSuccess | RemoveCardSuccess | UpdateCard | UpdateCardSuccess ;
