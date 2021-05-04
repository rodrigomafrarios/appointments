import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { LoadBookingParams } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class BookingMongoRepository implements AddBookingRepository, DeleteBookingRepository {
  async add (data: AddBookingParams): Promise<Booking> {
    const collection = await MongoHelper.getCollection('bookings')
    const result = await collection.insertOne(data)
    return result && MongoHelper.map(result.ops[0])
  }

  async delete (params: Booking): Promise<void> {
    const collection = await MongoHelper.getCollection('bookings')
    await collection.findOneAndDelete({
      professionalId: params.professionalId,
      start: params.start,
      end: params.end
    })
  }

  async loadByProfessionalIdAndPeriod (params: LoadBookingParams): Promise<Booking> {
    const collection = await MongoHelper.getCollection('bookings')
    const booking = await collection.findOne({
      professionalId: params.professionalId,
      start: params.start,
      end: params.end,
    })
    return booking
  }
}
