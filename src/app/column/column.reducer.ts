import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as columnActions from './colum.actions';

export interface ColumnState {
  title: string;
  boardId: string;
  order: number;
}
export const columnState: ColumnState = {
  title: '',
  boardId: '',
  order: 0
};

export function ColumnReducer(state = columnState, action: columnActions.columnActions) {
  switch (action.type) {
    case columnActions.ColumnTypes.ADD_COLUMN_SUCCESS: {
      return { ...state, success: true };
    }
    case columnActions.ColumnTypes.GET_COLUMN_SUCCESS: {
      return { ...state, success: true };
    }
    case columnActions.ColumnTypes.REMOVE_COLUMN_SUCCESS: {
      return { ...state, success: true };
    }
    case columnActions.ColumnTypes.UPDATE_COLUMN_SUCCESS: {
      return { ...state, success: true};
    }
    default:
      { return state; }
  }
}
