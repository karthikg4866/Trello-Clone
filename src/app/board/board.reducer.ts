import { createReducer, on, Action } from '@ngrx/store';
import * as  boardActions from './board.actions';

export interface State {
  title: string;
  columns: number;
  cards: number;
}
export const initialState: State = {
  columns: 0,
  cards: 0,
  title: ''
};
const boardReducer = createReducer(
  initialState,
  on(boardActions.addColumn, state => ({ ...state, columns: state.columns + 1 })),
  on(boardActions.deleteColumn, state => ({ ...state, columns: state.columns - 1 })),
  on(boardActions.addCard, state => ({ ...state, cards: state.cards + 1 })),
  on(boardActions.deleteCard, state => ({ ...state, cards: state.cards - 1 })),
  on(boardActions.updateColumnCard, (state, { title, columns, cards}) => {
    return ({ title, columns , cards });
  })
  );

export function BoardReducer(state: State | undefined, action: Action) {
  return boardReducer(state, action);
}
