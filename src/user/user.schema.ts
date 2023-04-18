import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  second_name: string;

  @Prop()
  vocabulary_id: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: mongoose.Types.ObjectId })
  _id: mongoose.Types.ObjectId | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
