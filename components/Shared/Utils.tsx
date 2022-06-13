import React = require('react');
import Note from '../NoteApp/Note';
import { NoteData } from '../slices/noteSlice';

export function GET_DATE_FILTER_FROM_DATE(date: Date) {
  return (
    GET_NUMBER_FORMATTED_TO_TWO_SPACES(date.getMonth()) +
    '/' +
    GET_NUMBER_FORMATTED_TO_TWO_SPACES(date.getDate()) +
    '/' +
    date.getFullYear()
  );
}

export function GET_NUMBER_FORMATTED_TO_TWO_SPACES(x: number): string {
  return x < 10 ? '0' + x : x + '';
}

interface NotesMapProps {
  notes: {
    value: NoteData[];
  };
  filter: {
    value: string;
  };
  page: {
    value: number;
  };
  pageSize: {
    value: number;
  };
}

// ex: d:05/08/2022
export function getDateMatch(v: NoteData, dateInput: string): boolean {
  // Make sure to add 1 to the month to compare against user input that is 1 higher.
  let formattedNoteDate =
    GET_NUMBER_FORMATTED_TO_TWO_SPACES(v.time.getMonth() + 1) +
    '/' +
    GET_NUMBER_FORMATTED_TO_TWO_SPACES(v.time.getDate()) +
    '/' +
    v.time.getFullYear();

  return dateInput === formattedNoteDate;
}

// dr:05/05/2022-05/08/2022
export function getDateRangeMatch(v: NoteData, dateInput: string): boolean {
  // First, make sure user input is in proper format.
  let reg = /\d\d\/\d\d\/\d\d\d\d-\d\d\/\d\d\/\d\d\d\d/gi;

  if (dateInput.match(reg) == null) {
    return false;
  }

  // Next, construct date range.
  let twoDatesFragmentArr = dateInput
    .split('-')
    .map((v1) => v1.split('/').map((v2) => parseInt(v2)));
  let fragA = twoDatesFragmentArr[0];
  let fragB = twoDatesFragmentArr[1];
  let date1 = new Date(fragA[2], fragA[0], fragA[1], 0, 0, 0, 0);
  let date2 = new Date(fragB[2], fragB[0], fragB[1], 23, 59, 59, 999);

  // Finally, return whether our note's date is within the specified date range.
  return (
    v.time.getTime() >= date1.getTime() && v.time.getTime() <= date2.getTime()
  );
}

export function G_GET_FILTERED_NOTES(props: NotesMapProps): NoteData[] {
  let filter = props.filter.value;
  let slicedNotes = props.notes.value.slice(0, props.notes.value.length);

  if (filter === undefined || filter.length === 0) {
    return slicedNotes;
  } else {
    let keywordArr: string[] = filter.split(' ');

    if (keywordArr.length === 0) {
      return slicedNotes;
    } else {
      let found;

      // First, process our filter str.
      return slicedNotes.filter((v: NoteData, i: number) => {
        found = false;

        keywordArr.some((keyword: string) => {
          let sub2 = keyword.substring(2, keyword.length);
          let sub3 = keyword.substring(3, keyword.length);

          if (
            keyword.substring(0, 2) === 'c:' &&
            sub2 !== undefined &&
            v.description.includes(sub2)
          ) {
            found = true;
          } else if (
            keyword.substring(0, 2) === 'd:' &&
            sub2 !== undefined &&
            getDateMatch(v, sub2)
          ) {
            found = true;
          } else if (
            keyword.substring(0, 3) === 'dr:' &&
            sub3 !== undefined &&
            getDateRangeMatch(v, sub3)
          ) {
            found = true;
          } else if (
            keyword.substring(0, 2) === 'r:' &&
            sub2 !== undefined &&
            !v.title.includes(sub2)
          ) {
            found = true;
          } else if (v.title.includes(keyword)) {
            found = true;
          }

          return found;
        });

        return found;
      });
    }
  }
}

export function G_GET_NOTES_MAP(props: NotesMapProps): React.ReactNode {
  let filteredNotes = G_GET_FILTERED_NOTES(props);

  // Now, create our core map of JSX elements to display.
  let jsxArr: JSX.Element[] = filteredNotes.map((v: NoteData, i: number) => {
    let noteProp = {
      id: v.id,
      disableReorder: props.filter.value !== '',
    };

    return <Note {...noteProp} />;
  });

  // Filter results based on page.
  let pageStart = props.pageSize.value * props.page.value;
  let pageEnd = pageStart + props.pageSize.value - 1;

  // d:06/13/2022
  let core = null;
  core = jsxArr.filter((v: JSX.Element, i: number) => {
    return i >= pageStart && i <= pageEnd;
  });

  // let maxPages = (jsxArr.length - 1) / props.pageSize.value;
  // wrap: {this.getPaginationControl(maxPages)}

  return <div className="note-grid">{core}</div>;
}
