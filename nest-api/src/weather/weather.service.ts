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
    return this.weatherModel.create(createWeatherDto) // ✔ correto
  }

  findAll() {
    return `This action returns all weather`
  }

  findOne(id: number) {
    return `This action returns a #${id} weather`
  }

  remove(id: number) {
    return `This action removes a #${id} weather`
  }
}
