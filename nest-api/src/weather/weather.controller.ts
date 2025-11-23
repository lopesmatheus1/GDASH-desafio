import { Controller, Get, Post, Body, Param, Delete, Res } from '@nestjs/common'
import { WeatherService } from './weather.service'
import { CreateWeatherDto } from './dto/create-weather.dto'
import { Public } from 'src/auth/decorator/public.decorator'
import { ExportService } from 'src/export/export.service'
import type { Response } from 'express'

@Controller('weather')
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
  findAll() {
    return this.weatherService.findAll()
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weatherService.findOne(+id)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weatherService.remove(+id)
  }
}
