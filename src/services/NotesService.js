class NotesService {
  constructor(db, user) {
    this.db = db;
    this.user = user;
    this.notesRef = this.db.ref("notes/" + this.user.uid);
  }

  getNotes(eventType, callback) {
    this.notesRef.on(eventType, callback);
  }

  async getNote(id, callback) {
    this.notesRef.child(id).once("value", callback);
  }

  addNote(note) {
    this.notesRef.push(note);
  }

  deleteNote(id) {
    this.notesRef.child(id).remove();
  }
}

export default NotesService;
