export default class NoteLib {
  static getRandomNoteTitle(): string {
    let x = ['cat', 'hat', 'bunny', 'dog', 'worm', 'face', 'apple'];
    let index = Math.floor(Math.random() * x.length);
    return x[index];
  }

  static getRandomNoteDescription(): string {
    let x = [
      'take out the garbage',
      'go to the doctor',
      'eat a mango',
      'walk the dog',
      'do something fun for a change',
    ];
    let index = Math.floor(Math.random() * x.length);
    return x[index];
  }
}
