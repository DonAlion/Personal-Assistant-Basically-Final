import React = require('react');
import { connect } from 'react-redux';
import {
  moveNoteDown,
  moveNoteUp,
  removeNote,
  modifyNote,
} from '..//slices/noteSlice';

class Note extends React.Component<NoteProps, {}> {
  constructor(props: NoteProps) {
    super(props);
  }

  changeTitle(event) {
    let x: any = {
      i: this.props.id,
      f: 'title',
      v: event.target.value,
    };

    this.props.modifyNote(x);
  }

  changeDescription(event) {
    let x: any = {
      i: this.props.id,
      f: 'description',
      v: event.target.value,
    };

    this.props.modifyNote(x);
  }

  changeEditMode(val) {
    let x: any = {
      i: this.props.id,
      f: 'editMode',
      v: val,
    };

    this.props.modifyNote(x);
  }

  getEditComponent() {
    let note = this.getNoteById(this.props.notes.value, this.props.id);

    return (
      <div>
        <h2>Modify Title</h2>
        <input
          type="text"
          value={note.title}
          onChange={(e) => {
            this.changeTitle(e);
          }}
        ></input>
        <h2>Modify Content</h2>
        <input
          type="text"
          value={note.description}
          onChange={(e) => {
            this.changeDescription(e);
          }}
        ></input>
        <br />
        <button
          onClick={(e) => {
            this.changeEditMode(false);
          }}
        >
          Save
        </button>
      </div>
    );
  }

  getNoteById(notes: any, id: any) {
    let c = 0;

    for (var note of notes) {
      if (note.id === id) {
        return note;
      }
    }

    return null;
  }

  render() {
    var editComponent = <div></div>;
    var bottom = null;
    let note = this.getNoteById(this.props.notes.value, this.props.id);

    if (note.editMode) {
      editComponent = this.getEditComponent();
      bottom = <hr />;
    }

    let isDisabled = this.props.disableReorder;

    return (
      <div className="note" key={this.props.id}>
        <h1>{note.title}</h1>
        <p>{note.time.toUTCString()}</p>
        <p>{note.description}</p>
        <button
          onClick={(e) => {
            this.changeEditMode(true);
          }}
        >
          Edit
        </button>
        <button
          disabled={isDisabled}
          onClick={() => {
            this.props.moveNoteUp(this.props.id);
          }}
        >
          Up
        </button>
        <button
          onClick={() => {
            this.props.moveNoteDown(this.props.id);
          }}
          disabled={isDisabled}
        >
          Down
        </button>
        <button
          onClick={() => {
            this.props.removeNote(this.props.id);
          }}
        >
          Delete
        </button>
        {bottom}
        {editComponent}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const notes = state.notes;

  return {
    notes,
  };
}

const mapDispatchToProps = {
  removeNote,
  moveNoteUp,
  moveNoteDown,
  modifyNote,
};

interface NoteProps {
  id;
  notes;
  disableReorder;
  moveNoteDown: Function;
  moveNoteUp: Function;
  removeNote: Function;
  modifyNote: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(Note);
