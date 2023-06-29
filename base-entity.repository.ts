import { AggregateRoot } from '@nestjs/cqrs';
import { IdentifiableEntitySchema } from './identifiable-entity.schema';
import { EntityRepository } from './entity.repository';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';

export abstract class BaseEntityRepository<
  TSchema extends IdentifiableEntitySchema,
  TEntity extends AggregateRoot,
> extends EntityRepository<TSchema, TEntity> {
  async findAll(): Promise<TEntity[]> {
    return this.find({});
  }

  async findOneById(id: string): Promise<TEntity> {
    return this.findOne({
      _id: new ObjectId(id),
    } as FilterQuery<TSchema>);
  }

  async findOneAndUpdateById(id: string, entity: TEntity): Promise<void> {
    await this.findOneAndUpdate(
      { _id: new ObjectId(id) } as FilterQuery<TSchema>,
      entity,
    );
  }

  async findOneAndDeleteById(id: string): Promise<void> {
    await this.findOneAndDelete({
      _id: new ObjectId(id),
    } as FilterQuery<TSchema>);
  }
}
