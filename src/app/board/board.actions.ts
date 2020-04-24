import { createAction, props } from '@ngrx/store';

export const addColumn = createAction('[Counter Component] addColumn');
export const deleteColumn = createAction('[Counter Component] deleteColumn');

export const addCard = createAction('[Counter Component] addCard');
export const deleteCard = createAction('[Counter Component] deleteCard');

export const updateColumnCard = createAction('[Counter Component] updateColumnCard',
                  props<{title: string , columns: number, cards: number}>());
