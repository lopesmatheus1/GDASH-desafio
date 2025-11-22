import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { CreateWeatherDto } from './dto/create-weather.dto'
import { Public } from 'src/auth/decorator/public.decorator'

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto)
  }

  @Get()
  findAll() {
    return this.weatherService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weatherService.remove(+id)
  }
}
