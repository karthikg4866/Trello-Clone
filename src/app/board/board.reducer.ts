import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as boardActions from './board.actions';
import { Board } from '../board/board';


export interface BoardState {
  title: string;
  columns: any[];
  cards: number;
}
export const boardState: BoardState = {
  columns: [],
  cards: 0,
  title: ''
};


export function BoardReducer(state = boardState, action: boardActions.boardColumnActions) {
  switch (action.type) {
    case boardActions.ColumnTypes.ADD_COLUMNS_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.ColumnTypes.GET_COLUMNS_SUCCESS: {
      return { ...state, columns: action.payload };
    }
    case boardActions.ColumnTypes.UPDATE_COLUMNS_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.ColumnTypes.REMOVE_COLUMNS_SUCCESS: {
      return { ...state, columns: action.payload };
    }
    case boardActions.CardTypes.ADD_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case boardActions.CardTypes.REMOVE_CARD_SUCCESS: {
      return { ...state, columns: action.payload };
    }
    default:
      { return state; }
  }
}
// export const getBoardState = createFeatureSelector<BoardState>("boardState");

// export const getAllBoards = createSelector(getBoardState, (state: BoardState) => {
//  console.log(state);
// });
