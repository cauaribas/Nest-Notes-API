import { Note } from '@prisma/client';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;
}
