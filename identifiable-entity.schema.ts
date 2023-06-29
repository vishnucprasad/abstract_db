import { Prop } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';

export abstract class IdentifiableEntitySchema {
  @Prop()
  protected readonly _id: ObjectId;
}
