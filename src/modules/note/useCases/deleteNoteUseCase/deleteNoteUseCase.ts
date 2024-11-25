import { NoteRepository } from '../../repositories/noteRepository';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}

  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) {
      throw new NotFoundException();
    }

    if (note.userId !== userId) {
      throw new UnauthorizedException();
    }

    await this.noteRepository.delete(noteId);
  }
}
