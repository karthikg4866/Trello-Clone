import { DashboardReducer } from '../dashboard/dashboard.reducer';
import { BoardReducer } from '../board/board.reducer';
import { ColumnReducer } from '../column/column.reducer';
import { CardReducer } from '../card/card.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    dashboard: any;
    board: any;
    column: any;
    card: any;
}

export const reducers: ActionReducerMap<AppState> = {
    dashboard: DashboardReducer,
    board: BoardReducer,
    column: ColumnReducer,
    card: CardReducer
};
