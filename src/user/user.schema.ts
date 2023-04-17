import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  first_name: string;

  @Prop()
  second_name: string;

  @Prop()
  vocabulary_id: string;

  @Prop()
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
