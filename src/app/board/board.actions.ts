import { createAction, props, Action } from '@ngrx/store';

export enum BoardIdTypes {
    GET_BOARD_ID = 'GET_BOARD_ID',
    GET_BOARD_ID_SUCCESS = 'GET_BOARD_ID_SUCCESS'
}
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
    UPDATE_CARD = 'UPDATE_CARD',
    GET_CARD = 'GET_CARD',
    GET_CARD_SUCCESS = 'GET_CARD_SUCCESS',
    UPDATE_CARD_SUCCESS = 'UPDATE_CARD_SUCCESS',
    REMOVE_CARD = 'REMOVE_CARD',
    ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS',
    REMOVE_CARD_SUCCESS = 'REMOVE_CARD_SUCCESS',
}

export class GetBoardbyId implements Action {
    readonly type = BoardIdTypes.GET_BOARD_ID;
    constructor(public payload: any) { }
}

export class GetBoardIdSuccess implements Action {
    readonly type = BoardIdTypes.GET_BOARD_ID_SUCCESS;
    constructor(public payload: any) {
    }
}

export class GetColumns implements Action {
    readonly type = ColumnTypes.GET_COLUMNS;
    constructor(public payload: any) { }
}

export class GetColumnsSuccess implements Action {
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


export class AddCardSuccess implements Action {
    readonly type = CardTypes.ADD_CARD_SUCCESS;
    constructor(public payload: any) { }
}

export class GetCard implements Action {
    readonly type = CardTypes.GET_CARD;
    constructor(public payload: any) { }
}
export class GetCardSucess implements Action {
    readonly type = CardTypes.GET_CARD_SUCCESS;
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

export class RemoveCard implements Action {
    readonly type = CardTypes.REMOVE_CARD;
    constructor(public payload: any) { }
}

export class RemoveCardSuccess implements Action {
    readonly type = CardTypes.REMOVE_CARD_SUCCESS;
    constructor(public payload: any) { }
}

export type boardColumnActions = UpdateCard | UpdateCardSuccess | GetCard | GetCardSucess | GetBoardbyId | GetBoardIdSuccess | GetColumns | GetColumnsSuccess | UpdateColumn | UpdateColumnSuccess | AddColumn | AddColumnSuccess | RemoveColumn | RemoveColumnSuccess | AddCard | RemoveCard | AddCardSuccess | RemoveCardSuccess;



