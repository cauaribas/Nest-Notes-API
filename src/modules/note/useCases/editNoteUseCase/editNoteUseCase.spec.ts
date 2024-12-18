import { makeUser } from "src/modules/user/factories/userFactory";
import { makeNote } from "../../factories/noteFactory";
import { EditNoteUseCase } from "./editNoteUseCase";
import { NoteRepositoryInMemory } from "../../repositories/noteRepositoryInMemory";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to edit a note', async () => {
    const user = makeUser({});
    const note = makeNote({ 
      userId: user.id 
    });

    noteRepositoryInMemory.notes = [note];

    await editNoteUseCase.execute({ 
      title: 'edited_title', 
      description: 'edited_description', 
      noteId: note.id, 
      userId: user.id 
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(1);
  });

  it('Should be able to throw an error when note is not found', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fake_title',
        description: 'fake_description',
        noteId: 'fake_id',
        userId: 'fake_id',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw an error when note has another user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    expect(async () => {
      await editNoteUseCase.execute({
        title: 'fake_title',
        description: 'fake_description',
        noteId: note.id,
        userId: 'fake_id',
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
