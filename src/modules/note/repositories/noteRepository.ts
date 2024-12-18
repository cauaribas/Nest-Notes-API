import { Note } from '@prisma/client';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
  abstract findById(id: string): Promise<Note | null>;
  abstract delete(id: string): Promise<void>;
  abstract save(note: Note): Promise<void>;
}
