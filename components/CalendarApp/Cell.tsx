import React = require('react');

export interface CellProps {
  classes: string;
  day: string;
  content: string;
  noteCount: number;
  clickFunc: Function;
}

export default function Cell(props: CellProps) {
  let noteDisplay = null;

  if (props.noteCount > 0) {
    noteDisplay = <p>{props.noteCount}</p>;
  }

  return (
    <button
      type="button"
      className={'flex-ele ' + props.classes}
      onClick={() => {
        props.clickFunc();
      }}
    >
      <h2>{props.day}</h2>
      <p>{props.content}</p>
      {noteDisplay}
    </button>
  );
}
