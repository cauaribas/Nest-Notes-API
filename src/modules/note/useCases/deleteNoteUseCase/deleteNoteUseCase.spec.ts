import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to delete a note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({ noteId: note.id, userId: user.id });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('Should be able to throw an error when note is not found', async () => {
    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: 'fake_id',
        userId: 'fake_id',
      });
    }).rejects.toThrowError(NotFoundException);
  });

  it('Should be able to throw an error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'fake_id',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
