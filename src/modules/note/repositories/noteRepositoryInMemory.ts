import { Note } from '@prisma/client';
import { NoteRepository } from './noteRepository';

export class NoteRepositoryInMemory implements NoteRepository {
  public notes: Note[] = [];

  async create(note: Note): Promise<void> {
    this.notes.push(note);
  }

  async findById(id: string): Promise<Note | null> {
    const note = this.notes.find((note) => note.id === id);

    if (!note) {
      return null;
    }

    return note;
  }

  async delete(id: string): Promise<void> {
    this.notes = this.notes.filter((note) => note.id !== id);
  }

  async save(note: Note): Promise<void> {
    const noteIndex = this.notes.findIndex(
      (currentNote) => currentNote.id === note.id
    );

    if (noteIndex >= 0) this.notes[noteIndex] = note;
  }
}
