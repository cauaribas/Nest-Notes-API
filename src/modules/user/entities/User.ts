import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface UserSchema {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserSchema;
  _id: string;

  constructor(
    props: Replace<UserSchema, { createdAt?: Date; updatedAt?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.password = password;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.name = name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
