import { createAction, props } from '@ngrx/store';

export const addColumn = createAction('[Counter Component] addColumn');
export const deleteColumn = createAction('[Counter Component] deleteColumn');

export const addCard = createAction('[Counter Component] addCard');
export const deleteCard = createAction('[Counter Component] deleteCard');

export const updateColumnCard = createAction('[Counter Component] updateColumnCard',
    props<{ title: string, columns: number, cards: number }>());
import { Action } from '@ngrx/store';

export enum ColumnTypes {
    GET_COLUMNS = 'GET_COLUMNS',
    GET_COLUMNS_SUCCESS = 'GET_COLUMNS_SUCCESS',

    ADD_COLUMNS = 'ADD_COLUMNS',
    ADD_COLUMNS_SUCCESS = 'ADD_COLUMNS_SUCCESS',

    UPDATE_COLUMNS = 'UPDATE_COLUMNS',
    UPDATE_COLUMNS_SUCCESS = 'UPDATE_COLUMNS_SUCCESS',

    REMOVE_COLUMNS = 'REMOVE_COLUMNS',
    REMOVE_COLUMNS_SUCCESS = 'REMOVE_COLUMNS_SUCCESS',
}

export enum CardTypes {
    ADD_CARD = 'ADD_CARD',
    REMOVE_CARD = 'REMOVE_CARD',
    ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS',
    REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS',
}

export class GetColumn implements Action {
    readonly type = ColumnTypes.GET_COLUMNS;
    constructor() { }
}

export class GetColumnSuccess implements Action {
    readonly type = ColumnTypes.GET_COLUMNS_SUCCESS;
    constructor(public payload: any) { }
}
export class AddColumn implements Action {
    readonly type = ColumnTypes.ADD_COLUMNS;
    constructor(public payload: any) { }
}
export class AddColumnSuccess implements Action {
    readonly type = ColumnTypes.ADD_COLUMNS_SUCCESS;
    constructor(public payload: any) { }
}
export class UpdateColumn implements Action {
    readonly type = ColumnTypes.UPDATE_COLUMNS;
    constructor(public payload: any) { }
}
export class UpdateColumnSuccess implements Action {
    readonly type = ColumnTypes.UPDATE_COLUMNS_SUCCESS;
    constructor(public payload: any) { }
}
export class RemoveColumn implements Action {
    readonly type = ColumnTypes.REMOVE_COLUMNS;
    constructor(public payload: any) { }
}

export class RemoveColumnSuccess implements Action {
    readonly type = ColumnTypes.REMOVE_COLUMNS_SUCCESS;
    constructor(public payload: any) { }
}

//

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

export type boardColumnActions = GetColumn | GetColumnSuccess | UpdateColumn | UpdateColumnSuccess | AddColumn | AddColumnSuccess | RemoveColumn | RemoveColumnSuccess | AddCard | RemoveCard | AddCardSuccess | RemoveCardSuccess;



