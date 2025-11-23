import { Controller, Get, Post, Body, Res, Query } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { CreateWeatherDto } from './dto/create-weather.dto'
import { Public } from 'src/auth/decorator/public.decorator'
import { ExportService } from 'src/export/export.service'
import type { Response } from 'express'

@Controller('weather/logs')
export class WeatherController {
  constructor(
    private weatherService: WeatherService,
    private exportService: ExportService
  ) {}

  @Public()
  @Post()
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto)
  }

  @Get()
  async findAll(@Query('month') month: number, @Query('year') year: number) {
    const YEAR = year ?? new Date().getFullYear()

    return this.weatherService.findAll(month, YEAR)
  }

  @Get('export.csv')
  async exportCsv(@Res() res: Response) {
    const logs = await this.weatherService.findAll()
    const buffer = await this.exportService.exportWeatherLogsCsv(logs)

    res.setHeader('Content-Type', 'text/csv')
    res.setHeader('Content-Disposition', 'attachment; filename=weather.csv')

    res.send(buffer)
  }

  @Get('export.xlsx')
  async exportExcel(@Res() res: Response) {
    const logs = await this.weatherService.findAll()
    const buffer = await this.exportService.exportWeatherLogsExcel(logs)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename=weather.xlsx')
    res.send(buffer)
  }
}
