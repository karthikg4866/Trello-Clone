import { createReducer, on, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as cardActions from './card.actions';

export interface CardState {
  title: string;
  columnId: string;
  boardId: string;
  order: number;
}
export const cardState: CardState = {
  title: '',
  boardId: '',
  columnId: '',
  order: 0
};

export function CardReducer(state = cardState, action: cardActions.cardActions) {
  switch (action.type) {
    case cardActions.CardTypes.ADD_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case cardActions.CardTypes.GET_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case cardActions.CardTypes.REMOVE_CARD_SUCCESS: {
      return { ...state, success: true };
    }
    case cardActions.CardTypes.UPDATE_CARD_SUCCESS: {
      return { ...state, success: true};
    }
    default:
      { return state; }
  }
}
