class NotesService {
  constructor(db, user) {
    this.db = db;
    this.user = user;
    this.notesRef = this.db.ref("notes/" + this.user.uid);
  }

  getNotes(eventType, callback) {
    this.notesRef
      .orderByChild("archived")
      .equalTo(false)
      .orderByChild("trashed")
      .equalTo(false)
      .on(eventType, callback);
  }

  getStarredNotes(eventType, callback) {
    this.notesRef
      .orderByChild("starred")
      .equalTo(true)
      .orderByChild("archived")
      .equalTo(false)
      .orderByChild("trashed")
      .equalTo(false)
      .on(eventType, callback);
  }

  getArchivedNotes(eventType, callback) {
    this.notesRef
      .orderByChild("archived")
      .equalTo(true)
      .orderByChild("trashed")
      .equalTo(false)
      .on(eventType, callback);
  }

  getTrashedNotes(eventType, callback) {
    this.notesRef
      .orderByChild("trashed")
      .equalTo(true)
      .on(eventType, callback);
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

  setStarred(id, isStarred) {
    this.notesRef.child(id).update({ starred: isStarred });
  }

  setArchived(id, isArchived) {
    this.notesRef.child(id).update({ archived: isArchived });
  }

  setTrashed(id, isTrashed) {
    this.notesRef.child(id).update({ trashed: isTrashed });
  }

  detachCallback(eventType, callback) {
    this.notesRef.off(eventType, callback);
  }

  detachAllCallbacks() {
    this.notesRef.off();
  }
}

export default NotesService;
