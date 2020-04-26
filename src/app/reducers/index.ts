import { DashboardReducer } from '../dashboard/dashboard.reducer';
import { BoardReducer } from '../board/board.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    dashboard: any;
    board: any;
}

export const reducers: ActionReducerMap<AppState> = {
    dashboard: DashboardReducer,
    board: BoardReducer
};
