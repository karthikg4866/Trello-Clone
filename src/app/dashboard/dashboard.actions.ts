import { Action } from '@ngrx/store';

export enum BoardTypes {
    GET_BOARD = 'GET_BOARD',
    GET_BOARD_SUCCESS = 'GET_BOARD_SUCCESS',
    ADD_BOARD = 'ADD_BOARD',
    REMOVE_BOARD = 'REMOVE_BOARD',
    ADD_BOARD_SUCCESS = 'ADD_BOARD_SUCCESS',
    REMOVE_BOARD_SUCCESS = 'REMOVE_BOARD_SUCCESS',
}

export class GetBoard implements Action {
    readonly type = BoardTypes.GET_BOARD;
    constructor() { }
}

export class GetBoardSuccess implements Action {
    readonly type = BoardTypes.GET_BOARD_SUCCESS;
    constructor(public payload: any) {
    }
}

export class AddBoard implements Action {
    readonly type = BoardTypes.ADD_BOARD;
    constructor(public payload: any) { }
}

export class RemoveBoard implements Action {
    readonly type = BoardTypes.REMOVE_BOARD;
    constructor(public payload: any) { }
}

export class AddBoardSuccess implements Action {
    readonly type = BoardTypes.ADD_BOARD_SUCCESS;
    constructor(public payload: any) { }
}

export class RemoveBoardSuccess implements Action {
    readonly type = BoardTypes.REMOVE_BOARD_SUCCESS;
    constructor(public payload: any) { }
}

export type boardActions = GetBoard | GetBoardSuccess | AddBoard | RemoveBoard | AddBoardSuccess | RemoveBoardSuccess;


