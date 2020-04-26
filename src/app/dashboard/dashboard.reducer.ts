import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';
import { Board } from '../board/board';

export interface DashboardState {
  title: string;
  boards: number;
  listOfBoards: Board[];
}
export const dashboardState: DashboardState = {
  boards: 0,
  title: '',
  listOfBoards: []
};

export function DashboardReducer(state = dashboardState, action: dashboardActions.boardActions) {
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
