class NotesService {
  constructor(db, user) {
    this.db = db;
    this.user = user;
    this.notesRef = this.db.ref("notes/" + this.user.uid);
  }

  getNotes(eventType, callback) {
    this.notesRef.on(eventType, callback);
  }

  getStarredNotes(eventType, callback) {
    this.notesRef.equalTo(true, "starred").on(eventType, callback);
  }

  getArchivedNotes(eventType, callback) {
    this.notesRef.equalTo(true, "archived").on(eventType, callback);
  }

  getTrashedNotes(eventType, callback) {
    this.notesRef.equalTo(true, "trashed").on(eventType, callback);
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

  setStarred(id) {
    this.notesRef.child(id);
  }
}

export default NotesService;
