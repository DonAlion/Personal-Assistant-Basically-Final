import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../slices/filterSlice';
import noteReducer, { NoteData } from '../slices/noteSlice';
import pageSizeReducer from '../slices/pageSizeSlice';
import pageReducer from '../slices/pageSlice';
import viewReducer from '../slices/viewSlice';

export interface AppState {
  filter: string;
  notes: Array<NoteData>;
  pageSize: number;
  page: number;
  view: number;
}

// Don't combine reducers, becuase values get nulled in practice.
export default configureStore({
  reducer: {
    filter: filterReducer,
    notes: noteReducer,
    pageSize: pageSizeReducer,
    page: pageReducer,
    view: viewReducer,
  },
});
