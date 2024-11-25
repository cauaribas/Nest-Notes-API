import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'any_title',
      userId: 'any_user_id',
      description: 'any_description',
      ...override,
    },
    id,
  );
};
