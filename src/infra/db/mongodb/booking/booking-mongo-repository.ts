import { AddBookingRepository } from '@/data/interfaces/db/booking/add-booking/add-booking-repository'
import { DeleteBookingRepository } from '@/data/interfaces/db/booking/delete-booking/delete-booking-repository'
import { LoadBookingParams, LoadBookingRepository } from '@/data/interfaces/db/booking/load-booking/load-booking-repository'
import { Booking } from '@/domain/models/booking'
import { AddBookingParams } from '@/domain/usecases/booking/add-booking/add-booking'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { ObjectId } from 'mongodb'

export class BookingMongoRepository implements AddBookingRepository, DeleteBookingRepository, LoadBookingRepository {
  async add (data: AddBookingParams): Promise<any> {
    const collection = await MongoHelper.getCollection('bookings')
    const result = await collection.findOneAndUpdate({
      professionalId: new ObjectId(data.professionalId),
      start: data.start,
      end: data.end
    }, {
      $set: {
        customerName: data.customerName
      }
    }, {
      upsert: true,
      returnOriginal: false
    })
    return result.value && MongoHelper.map(result.value)
  }

  async delete (params: Booking): Promise<void> {
    const collection = await MongoHelper.getCollection('bookings')
    await collection.findOneAndDelete({
      professionalId: new ObjectId(params.professionalId),
      start: params.start,
      end: params.end
    })
  }

  async loadByProfessionalIdAndPeriod (params: LoadBookingParams): Promise<Booking> {
    const collection = await MongoHelper.getCollection('bookings')
    const booking = await collection.findOne({
      professionalId: new ObjectId(params.professionalId),
      start: params.start,
      end: params.end
    })

    return booking && MongoHelper.map(booking)
  }
}
