import { AddBookRepository } from '@/data/interfaces/db/book/add-book/add-book-repository'
import { Book } from '@/domain/models/book'
import { AddBookParams } from '@/domain/usecases/book/add-book/add-book'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class BookMongoRepository implements AddBookRepository {
  async add (data: AddBookParams): Promise<Book> {
    const collection = await MongoHelper.getCollection('bookings')
    const result = await collection.insertOne(data)
    return result && MongoHelper.map(result.ops[0])
  }
}
