import { Action } from '@ngrx/store';

export enum ColumnTypes {
    GET_COLUMN = 'GET_COLUMN',
    GET_COLUMN_SUCCESS = 'GET_COLUMN_SUCCESS',
    ADD_COLUMN = 'ADD_COLUMN',
    REMOVE_COLUMN = 'REMOVE_COLUMN',
    ADD_COLUMN_SUCCESS = 'ADD_COLUMN_SUCCESS',
    REMOVE_COLUMN_SUCCESS = 'REMOVE_COLUMN_SUCCESS',
    UPDATE_COLUMN = 'UPDATE_COLUMN',
    UPDATE_COLUMN_SUCCESS = 'UPDATE_COLUMN_SUCCESS',
}

export class GetColumn implements Action {
    readonly type = ColumnTypes.GET_COLUMN;
    constructor() { }
}

export class GetColumnSuccess implements Action {
    readonly type = ColumnTypes.GET_COLUMN_SUCCESS;
    constructor(public payload: any) { }
}
export class AddColumn implements Action {
    readonly type = ColumnTypes.ADD_COLUMN;
    constructor(public payload: any) { }
}

export class RemoveColumn implements Action {
    readonly type = ColumnTypes.REMOVE_COLUMN;
    constructor(public payload: any) { }
}

export class AddColumnSuccess implements Action {
    readonly type = ColumnTypes.ADD_COLUMN_SUCCESS;
    constructor(public payload: any) { }
}

export class RemoveColumnSuccess implements Action {
    readonly type = ColumnTypes.REMOVE_COLUMN_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateColumn implements Action {
  readonly type = ColumnTypes.UPDATE_COLUMN;
  constructor(public payload: any) { }
}

export class UpdateColumnSuccess implements Action {
  readonly type = ColumnTypes.UPDATE_COLUMN_SUCCESS;
  constructor(public payload: any) { }
}

export type columnActions =  GetColumn | GetColumnSuccess| AddColumn | RemoveColumn
                          | AddColumnSuccess | RemoveColumnSuccess | UpdateColumn | UpdateColumnSuccess ;
