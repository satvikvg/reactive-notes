import { NoteStates } from "../constants/NoteConstants";

class NotesService {
  constructor(db, user) {
    this.db = db;
    this.user = user;
    this.notesRef = this.db.ref("notes/" + this.user.uid);
  }

  getNotes(eventType, callback) {
    this.notesRef
      .orderByChild("state")
      .equalTo(NoteStates.DEFAULT)
      .on(eventType, callback);
  }

  getStarredNotes(eventType, callback) {
    this.notesRef
      .orderByChild("starred")
      .equalTo(true)
      .on(eventType, callback);
  }

  getArchivedNotes(eventType, callback) {
    this.notesRef
      .orderByChild("state")
      .equalTo(NoteStates.ARCHIVED)
      .on(eventType, callback);
  }

  getTrashedNotes(eventType, callback) {
    this.notesRef
      .orderByChild("state")
      .equalTo(NoteStates.TRASHED)
      .on(eventType, callback);
  }

  getNote(id, callback) {
    this.notesRef.child(id).once("value", snapshot => {
      if (snapshot.exists) {
        const note = {
          id: snapshot.key,
          type: snapshot.val().type,
          title: snapshot.val().title,
          content: snapshot.val().content,
          starred: snapshot.val().starred,
          state: snapshot.val().state
        };
        callback(note);
      } else {
        callback(null);
      }
    });
  }

  addNote(note) {
    this.notesRef.push(note);
  }

  deleteNote(id, onComplete) {
    this.notesRef.child(id).remove(onComplete);
  }

  toggleStarred(note, onComplete) {
    if (note.starred) {
      this.notesRef.child(note.id).update({ starred: false }, onComplete);
    } else {
      this.notesRef.child(note.id).update({ starred: true }, onComplete);
    }
  }

  toggleArchived(note, onComplete) {
    if (note.state === NoteStates.ARCHIVED) {
      this.notesRef
        .child(note.id)
        .update({ state: NoteStates.DEFAULT }, onComplete);
    } else {
      this.notesRef
        .child(note.id)
        .update({ state: NoteStates.ARCHIVED }, onComplete);
    }
  }

  toggleTrashed(note, onComplete) {
    if (note.state === NoteStates.TRASHED) {
      this.notesRef
        .child(note.id)
        .update({ state: NoteStates.DEFAULT }, onComplete);
    } else {
      this.notesRef
        .child(note.id)
        .update({ state: NoteStates.TRASHED }, onComplete);
    }
  }

  detachCallback(eventType, callback) {
    this.notesRef.off(eventType, callback);
  }

  detachAllCallbacks() {
    this.notesRef.off();
  }
}

export default NotesService;
