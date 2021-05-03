import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class BookingMongoRepository implements AddBookingRepository {
  async add (data: AddBookingParams): Promise<Booking> {
    const collection = await MongoHelper.getCollection('bookings')
    const result = await collection.insertOne(data)
    return result && MongoHelper.map(result.ops[0])
  }
}
