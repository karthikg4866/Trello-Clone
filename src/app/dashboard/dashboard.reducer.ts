import { createReducer, on, Action } from '@ngrx/store';
import * as dashboardActions from './dashboard.actions';

export interface State {
  title: string;
  boards: number;
}
export const initialState: State = {
  boards: 0,
  title: ''
};
const dashboardReducer = createReducer(
  initialState,
  on(dashboardActions.addboard, state => ({ ...state, boards: state.boards + 1 })),
  on(dashboardActions.resetboard, state => ({boards: 0 , title: ''} ))
);

export function DashboardReducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
