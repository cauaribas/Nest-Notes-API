import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface NoteProps {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; updatedAt?: Date; description?: string }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      description: props.description ?? null,
    };

    this._id = id ?? randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.title = title;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.description = description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
