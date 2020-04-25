import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { Board } from '../board/board';

export interface BoardState {
  title: string;
  boards: number;
  listOfBoards: Board[];
}
export const boardState: BoardState = {
  boards: 0,
  title: '',
  listOfBoards: []
};
// const dashboardReducer = createReducer(
//   initialState,
//   on(dashboardActions.addboard, state => ({ ...state, boards: state.boards + 1 })),
//   on(dashboardActions.resetboard, state => ({boards: 0 , title: ''} ))
// );

export function DashboardReducer(state = boardState, action: dashboardActions.boardActions) {
  switch (action.type) {
    case dashboardActions.BoardTypes.ADD_BOARD_SUCCESS: {
      return { ...state, success: true };
    }

    case dashboardActions.BoardTypes.GET_BOARD_SUCCESS: {
      return { ...state, listOfBoards: action.payload };
    }
    case dashboardActions.BoardTypes.REMOVE_BOARD_SUCCESS: {
      return { ...state, board: action.payload };
    }
    default:
      { return state; }
  }
}
// export const getBoardState = createFeatureSelector<BoardState>("boardState");

// export const getAllBoards = createSelector(getBoardState, (state: BoardState) => {
//  console.log(state);
// });
