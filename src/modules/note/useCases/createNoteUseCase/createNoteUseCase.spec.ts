import { NoteRepositoryInMemory } from '../../repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create Note', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('Should be able to create a new note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'any_title',
      description: 'any_description',
      userId: 'any_user_id',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
