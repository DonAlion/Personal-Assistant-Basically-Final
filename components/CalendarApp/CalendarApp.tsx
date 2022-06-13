import React = require('react');
import Cell from '../CalendarApp/Cell';
import './CalendarApp.css';
import {
  modifyNote,
  addNote,
  removeNote,
  NoteData,
} from '..//slices/noteSlice';
import { modifyFilter } from '..//slices/filterSlice';

import { connect } from 'react-redux';
import { GET_DATE_FILTER_FROM_DATE, G_GET_NOTES_MAP } from '../Shared/Utils';

const t_second = 1000;
const t_minute = t_second * 60;
const t_hour = t_minute * 60;
const t_day = t_hour * 24;
const t_month = t_day * 30;

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const daysShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

// Is cloned via spread operator. Do not add functions without refactoring first.
export interface CalenderState {
  cellData: {
    [id: number]: string;
  };
  activeCell: number;
  inputState: string;
  initialTextAreaValue: string;
}

class CalendarApp extends React.Component<AppProps, CalenderState> {
  state: CalenderState;

  constructor(props: any) {
    super(props);

    let cellData = {};

    for (var i = 0; i < 31; i++) {
      cellData[i] = '';
    }

    this.state = {
      cellData: cellData,
      activeCell: -1,
      inputState: '',
      initialTextAreaValue: '',
    };
  }

  getDay(dayModifier) {
    var d = new Date();
    d.setTime(d.getTime() - dayModifier * t_day);
    return days[d.getDay()];
  }

  getGridCell(c, additionalClasses) {
    let content = this.state.cellData[c];

    if (content == undefined) {
      content = '';
    }

    // Determine how many notes are on the same day as the cells day.
    let now = new Date();
    let noteCount = 0;

    for (var note of this.props.notes.value) {
      if (
        now.getFullYear() === note.time.getFullYear() &&
        now.getMonth() === note.time.getMonth() &&
        c === note.time.getDate()
      ) {
        noteCount++;
      }
    }

    return (
      <Cell
        classes={additionalClasses}
        day={c + ''}
        content={content}
        noteCount={noteCount}
        clickFunc={() => {
          // Update our active cell and initial text area value.
          let x = { ...this.state };
          x.activeCell = c;
          x.initialTextAreaValue = this.state.cellData[c];
          this.setState(x);

          // Update filter. (Make sure to add 1 to month to match how user input would look)
          let reconstructedDate = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            c
          );
          let timeStr: string = GET_DATE_FILTER_FROM_DATE(reconstructedDate);
          let filter = 'd:' + timeStr;

          // Modify our filter to the current date.
          this.props.modifyFilter(filter);
        }}
      />
    );
  }

  getGrid() {
    let now = new Date();
    let dayBar = [];
    let grid = [];

    for (let dataShort of daysShort) {
      dayBar.push(<p className="flex-ele">{dataShort}</p>);
    }

    grid.push(dayBar);

    for (var i = 1; i < 6; i++) {
      grid[i] = [];
    }

    let dayOffset = new Date().getDay();
    let c = 1;
    let c2 = 1;
    let index;

    let lastDayOfLastMonth: Date = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      0
    );
    let lastDayOfLastMonthExact: number = lastDayOfLastMonth.getDate() + 1;
    let currentDay = now.getDate();

    for (let i = 0; i < 35; i++) {
      index = Math.floor(i / 7) + 1;

      if (i < dayOffset + 1) {
        grid[index].push(
          <p className="flex-ele faded-ele">
            {lastDayOfLastMonthExact + i - dayOffset}
          </p>
        );
      } else if (i < 31 + dayOffset) {
        if (c == currentDay) {
          grid[index].push(this.getGridCell(c, 'higlight-ele'));
        } else {
          grid[index].push(this.getGridCell(c, ''));
        }

        c++;
      } else {
        grid[index].push(<p className="flex-ele faded-ele">{c2++}</p>);
      }
    }

    return (
      <div className="calandar-grid">
        {grid.map((v) => {
          return v.map((v2) => {
            return v2;
          });
        })}
      </div>
    );
  }

  getDisplayedInputValue() {
    let x = this.state.cellData[this.state.activeCell];

    if (x === undefined) {
      return '';
    }
    return x;
  }

  /* 
  Edit Modal
  */
  getEditModal() {
    return (
      <div className="my-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Header */}
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Note Editor
              </h5>
            </div>
            {/* Body */}
            <div className="modal-body">
              Note:{' '}
              <textarea
                value={this.state.cellData[this.state.activeCell]}
                onChange={(e) => {
                  var x = { ...this.state };
                  x.cellData[this.state.activeCell] = e.target.value;
                  this.setState(x);
                }}
              ></textarea>
            </div>
            {/* Footer */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  let x = { ...this.state };
                  x.activeCell = -1;
                  x.cellData[this.state.activeCell] =
                    this.state.initialTextAreaValue;
                  this.setState(x);
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  let x = { ...this.state };
                  x.activeCell = -1;
                  this.setState(x);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  getMonthButton(today: Date, mod: number) {
    let newMonth = today.getMonth() + mod;

    return newMonth < 0 || newMonth > 11 ? null : (
      <button>{months[today.getMonth() - 1]}</button>
    );
  }

  render() {
    let today = new Date();
    let literalDayPretty = this.getDay(0);
    let grid = this.getGrid();
    let editModal;

    if (this.state.activeCell !== -1) {
      let x: any = {
        notes: this.props.notes,
        filter: this.props.filter,
        page: {
          value: 0,
        },
        pageSize: {
          value: 999,
        },
      };

      editModal = G_GET_NOTES_MAP(x);
    }

    return (
      <div>
        <h2>
          {months[today.getMonth()]} {today.getDate()}, {today.getFullYear()}
        </h2>
        <p>{literalDayPretty}</p>
        <button>{months[today.getMonth() - 1]}</button>
        {months[today.getMonth()]}
        <button>{months[today.getMonth() + 1]}</button>
        {grid}
        {editModal}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const notes = state.notes;
  const filter = state.filter;

  return {
    notes,
    filter,
  };
}

const mapDispatchToProps = {
  modifyNote,
  addNote,
  removeNote,
  modifyFilter,
};

interface AppProps {
  notes: NoteData[];
  filter: string;
  modifyNote: Function;
  addNote: Function;
  removeNote: Function;
  modifyFilter: Function;
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarApp);
