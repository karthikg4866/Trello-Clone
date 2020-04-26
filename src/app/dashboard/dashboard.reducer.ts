import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { Board } from '../board/board';

export interface DashboardState {
  title: string;
  board: any;
  listOfBoards: Board[];
}
export const dashboardState: DashboardState = {
  board: null,
  title: '',
  listOfBoards: []
};

export function DashboardReducer(state = dashboardState, action: dashboardActions.boardActions) {
  switch (action.type) {
    case dashboardActions.BoardTypes.ADD_BOARD_SUCCESS: {
      return { ...state, success: true, board: action.payload };
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
