This is a tribute to a bug that I spent nearly 40 hours attempting to address. And, as a result, wound up becoming a master with front-end states as a result.

In the simplest terms possible, my bug was caused by passing a map index variable 'i' into my 'Note' component props. This resulted in Note components incorrectly being mapped to the wrong indexes in the top-level notes array.

That's it. A full work week of time invested into such a small bug. This seems almost inconcievable? Right? However, I assure you that this bug was the perfect storm of reasons for why it was 'hard to track down and fix'.

There were a lot of reasons for why this bug took so long to fix. Here are some:

- The UI worked 'good enough'. It just appeared to be a graphical glitch due to the DOM not updating.
- The data for everything looked really good around the Item Component logic. All of the state variables updated as expected everywhere I investigated.
- There was no obvious indication that individual item components were recieving the wrong data. Instead, everything appeared to be failing on the level of the top-level notes array.
- And, these reasons lead to the final reason why it took so long: I doubted that React was actually behaving as intended.

And, because of this doubt, I wound up investing massive amounts of time into refactoring. I wasn't convinced that there wasn't some kind of state bug. And, this led me to trying to 'fight' the framework to 'force' a proper UI display by changing how Note data was stored within the project.

I tried everything from a second 'filtered note array' reducer, class-level state-based note array, reducer/class-level filters, lifecycle hooked changes and much more. The entire Utils.tsx file was birthed from trying to fix this bug. And, so was the switch of this project from React's Native State Management to Redux.

Yes. I literally added + learned Redux because of this bug.

Fortunately, I learned a lot because of it. I know all of the nuances of state now and even got a decent refresher on Redux. And, I now also know and can:

a.) Trust the technology stack's rules
b.) Don't pass index values to component's on creation. Use ids. Or, better yet, pass a function that takes an instance of the object to add/remove/modify, etc.
c.) ALWAYS check every component related to an issue. I actually found the issue by adding logging to the item component, leading me to realize that the actual item components weren't getting the right id assignment. I neglected it for so long due to the misdirections listed above. And, honestly, will never make that mistake again, I hope.

Finally, the issue recap.

Function 'G_GET_NOTES_MAP()' in Utils.tsx calls a map function on FILTERED notesData objects. And, I was passing the INDEX for that map function to the created Item Components there.

The result is that Item components were recieving the filtered map index values, rather than an index value that maps to their non-filtered array position.
