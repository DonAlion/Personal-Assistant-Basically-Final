import React = require('react');

export default function HelpApp() {
  return (
    <div>
      <h1>App Help</h1>
      <hr />
      <h2>The 'Notes' Tab</h2>
      <p>
        Use the 'Notes' tab as a convenient way to create notes for, well,
        anything!
      </p>
      <p>
        The 'Add Note' button at the top can be used to add a new note, while
        the specific controls on each note can be used to manage the contents
        and position of notes.
      </p>
      <p>
        The filter bar filters notes using keywords (ex: 'cat hat bat'). By
        default, it is case sensitive and only searches note titles for matches.
        However, there are advanced options available through a prefix system.
        See the bottom of this page for the prefix reference.
      </p>
      <hr />
      <h2>The 'Calendar' Tab</h2>
      <p>
        The 'Calendar' tab shows how note data can be integrated into another
        application. The calender shows the days of the current month and the
        number of notes associated with that day, if any. Upon clicking a day
        with, the user is presented with a pre-filtered instance of the Notes
        tab below it. These notes can then be modified as desired, similarly to
        on the Notes tab. The user may also return to the Notes tab for full
        note-searching functionality.
        <br />
        Please note that the Calandar is only a proof-of-concept to demonstrate
        how notes can be displayed and isn't meant to be a scheduling app. With
        features like a right-click menu on each cell to add new notes to dates,
        the ability to cycle through months and years, and other such features,
        it could become such a tool.
      </p>
      <hr />
      <h2>The 'Data' Tab</h2>
      <p>
        The 'Data' tab is used to save and load data to and from the
        application. Hitting the save button will let you save a file somewhere
        on your computer using your computer's browser, while the load feature
        will let you load the file from a chosen location.
      </p>
      <hr />
      <h2>Filter Prefix Reference</h2>
      <p>
        content: prefix 'c:' before keyword, ex: 'c:hat', format: 'c[keyword]'
      </p>
      <p>
        date: prefix 'd' before date, ex: d:05/08/2022, format: d:[MM/DD/YYYY] /{' '}
      </p>
      <p>
        date-range: prefix 'dr' before date range, ex: dr:05/05/2022-05/08/2022,
        format: 'dr:[MM/DD/YYYY]-[MM/DD/YYYY]' - (make sure the first date is
        less than second!)
      </p>
      <p>
        reverse-search: prefix 'r:' before keyword, ex: 'r:hat', format:
        'r:[keyword]'
      </p>
      <p>Surround a keyword with quotes to ignore advanced-search prefixes.</p>
    </div>
  );
}
