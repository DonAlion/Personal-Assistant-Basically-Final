import { createSlice } from '@reduxjs/toolkit';
import NoteLib from '../NoteApp/NoteLib';

let uniqueNoteIds = 0;

function getUniqueNoteId() {
  let id = uniqueNoteIds;
  uniqueNoteIds = uniqueNoteIds + 1;
  if (uniqueNoteIds > 999999999) {
    uniqueNoteIds = 0;
  }
  return uniqueNoteIds;
}

// Our note data format
export interface NoteData {
  id: number; // unique id
  title: string;
  description: string;
  time: Date;
  editMode: boolean;
}

export interface ModifyNoteAction {
  payload: {
    i: number; //id
    f: string; //field
    v: any; //value
  };
}

// Initialization data for noteSlice.
const now = new Date();
let noteDataArr: Array<NoteData> = [];

// Function to generate a new random note data.
export function getNewRandomNoteData(): NoteData {
  return {
    id: getUniqueNoteId(),
    title: NoteLib.getRandomNoteTitle(),
    description: NoteLib.getRandomNoteDescription(),
    time: now,
    editMode: false,
  };
}

// Populate noteDataArr and give first 2 records old dates.
(() => {
  const old1 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5);
  const old2 = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);

  for (var i = 0; i < 5; i++) {
    noteDataArr.push(getNewRandomNoteData());
  }

  noteDataArr[0].time = old1;
  noteDataArr[1].time = old2;

  noteDataArr[0].title = 'cat';
  noteDataArr[1].title = 'bunny';
  noteDataArr[2].title = 'zebra';
})();

export function getNoteIndexById(state: any, id: any) {
  let notes = state.value;
  let c = 0;

  for (var note of notes) {
    if (note.id === id) {
      return c;
    }
    c++;
  }

  return -1;
}

export const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    value: noteDataArr,
  },
  reducers: {
    addNote: (state) => {
      state.value.push(getNewRandomNoteData());
    },
    removeNote: (state, action) => {
      // payload in the id
      let index = getNoteIndexById(state, action.payload);

      if (index === -1) {
        return;
      }
      state.value.splice(index, 1);
    },
    moveNoteDown: (state, action) => {
      // payload in the id
      let index = getNoteIndexById(state, action.payload);

      if (index === state.value.length - 1 || index === -1) {
        return;
      }

      let notes = state.value;
      let temp = notes[index + 1];
      notes[index + 1] = notes[index];
      notes[index] = temp;
    },
    moveNoteUp: (state, action) => {
      // payload in the id
      let index = getNoteIndexById(state, action.payload);

      if (index === 0 || index === -1) {
        return;
      }

      const notes = state.value;
      let temp = notes[index - 1];
      notes[index - 1] = notes[index];
      notes[index] = temp;
    },
    modifyNote: (state, action: ModifyNoteAction) => {
      // payload in the ifv object.
      let index = getNoteIndexById(state, action.payload.i);

      if (index === -1) {
        return;
      }

      let p = action.payload;
      state.value[index][p.f] = p.v;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNote, removeNote, moveNoteDown, moveNoteUp, modifyNote } =
  notesSlice.actions;

export default notesSlice.reducer;
