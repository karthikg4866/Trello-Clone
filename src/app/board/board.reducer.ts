import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as boardActions from './board.actions';
import { Board } from '../board/board';
import { Column } from '../column/column';
import { Card } from '../card/card';


export interface BoardState {
  _id: string;
  title: string;
  columns: Column[];
  cards: Card[];
}
export const boardState: BoardState = {
  _id: null,
  columns: [],
  cards: [],
  title: ''
};


export function BoardReducer(state = boardState, action: boardActions.boardColumnActions) {
  switch (action.type) {
    case boardActions.BoardIdTypes.GET_BOARD_ID_SUCCESS: {
      return { ...state, _id: action.payload._id, title: action.payload.title };
    }
    case boardActions.ColumnTypes.ADD_COLUMNS_SUCCESS: {
      return { ...state, success: true};
    }
    case boardActions.ColumnTypes.GET_COLUMNS_SUCCESS: {
      return { ...state, columns: action.payload };
    }
    case boardActions.ColumnTypes.UPDATE_COLUMNS_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.ColumnTypes.REMOVE_COLUMNS_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.CardTypes.ADD_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.CardTypes.UPDATE_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.CardTypes.GET_CARD_SUCCESS: {
      return { ...state, cards: action.payload };
    }
    case boardActions.CardTypes.REMOVE_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    default:
      { return state; }
  }
}
