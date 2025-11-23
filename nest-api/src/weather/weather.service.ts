import { Injectable } from '@nestjs/common'
import { CreateWeatherDto } from './dto/create-weather.dto'
import { InjectModel } from '@nestjs/mongoose'
import { WeatherLog, WeatherLogDocument } from './schema/weather.schema'
import { Model } from 'mongoose'

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(WeatherLog.name)
    private weatherModel: Model<WeatherLogDocument>
  ) {}

  async create(createWeatherDto: CreateWeatherDto) {
    return this.weatherModel.create(createWeatherDto)
  }

  async findAll(month?: number, year?: number) {
    const query: {
      createdAt?: { $gte: Date; $lt: Date }
    } = {}

    if (month && year) {
      query.createdAt = {
        $gte: new Date(year, month - 1, 1),
        $lt: new Date(year, month, 1),
      }
    }

    return await this.weatherModel.find(query).exec()
  }

  async findByDateRange(startDate: Date, endDate: Date) {
    const query: {
      createdAt?: { $gte: Date; $lt: Date }
    } = {
      createdAt: { $gte: startDate, $lt: endDate },
    }

    return await this.weatherModel.find(query).exec()
  }
}
