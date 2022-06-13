import * as React from 'react';
import './style.css';

import { connect, useSelector } from 'react-redux';
import { AppState } from './components/State/store';
import {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyNote,
} from './components/slices/noteSlice';
import { modifyView } from './components/slices/viewSlice';
import { modifyPage } from './components/slices/pageSlice';
import NoteApp from './components/NoteApp/NoteApp';
import HelpApp from './components/HelpApp/HelpApp';
import CalendarApp from './components/CalendarApp/CalendarApp';

class App extends React.Component<AppProps, AppState> {
  setView(newView: number) {
    this.props.modifyView(newView);
  }

  /**
   * Adds a note to the top of the note stack.
   */
  addNote() {
    this.props.addNote();
  }

  down(i: number) {
    this.props.moveNoteDown(i);
  }

  up(i: number) {
    this.props.moveNoteUp(i);
  }

  deleteFunction(i: number) {
    // Remove the note.
    this.props.removeNote(i);

    // Handle perhaps needing to adjust current page.
    const newPage = useSelector((state: AppState) => state.page);
    const notes = useSelector((state: AppState) => state.notes);

    // Lower page too, if we:
    // delete last list ele &
    // we're on a flat list interval &
    // we're not on last page.

    if (
      i === notes.length &&
      notes.length % this.props.pageSize.value === 0 &&
      notes.length > 0
    ) {
      this.props.modifyPage(newPage - 1);
    }
  }

  render() {
    var v;

    switch (this.props.view.value) {
      case 0:
        v = <NoteApp />;
        break;
      case 1:
        v = <CalendarApp />;
        break;
      case 2:
        v = <HelpApp />;
        break;
    }

    let setViewNotes = () => {
      this.setView(0);
    };

    let setViewCalendar = () => {
      this.setView(1);
    };

    let setViewHelp = () => {
      this.setView(2);
    };

    return (
      <div id="App">
        <h1>Personal Assistant App</h1>
        <button onClick={setViewNotes}>Notes</button>
        <button onClick={setViewCalendar}>Calendar</button>
        <button onClick={setViewHelp}>Help</button>
        <hr />
        {v}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const filter = state.filter;
  const notes = state.notes;
  const pageSize = state.pageSize;
  const page = state.page;
  const view = state.view;

  return {
    filter,
    notes,
    pageSize,
    page,
    view,
  };
}

const mapDispatchToProps = {
  addNote,
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyView,
  modifyPage,
  modifyNote,
};

interface AppProps {
  addNote: Function;
  moveNoteDown: Function;
  moveNoteUp: Function;
  removeNote: Function;
  modifyView: Function;
  modifyPage: Function;
  modifyNote: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
