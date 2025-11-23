import { Injectable } from '@nestjs/common'
import * as fastcsv from 'fast-csv'
import * as exceljs from 'exceljs'
import { WeatherLogDocument } from 'src/weather/schema/weather.schema'

@Injectable()
export class ExportService {
  constructor() {}

  private mapWeatherLog(item: WeatherLogDocument) {
    return {
      id: item._id.toString(),
      temperature: item.temperature,
      humidity: item.humidity,
      windSpeed: item.windSpeed,
      weatherCondition: item.weatherCondition,
      weatherCode: item.weatherCode,
      precipitationProbability: item.precipitationProbability,
      createdAt: item.createdAt.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    }
  }

  async exportWeatherLogsCsv(data: WeatherLogDocument[]): Promise<Buffer> {
    const csvStream = fastcsv.format({ headers: true })
    const chunks: Buffer[] = []

    return new Promise<Buffer>((resolve, reject) => {
      csvStream
        .on('data', (chunk) => chunks.push(Buffer.from(chunk)))
        .on('end', () => resolve(Buffer.concat(chunks)))
        .on('error', reject)

      data.forEach((item) => {
        csvStream.write(this.mapWeatherLog(item))
      })
      csvStream.end()
    })
  }

  async exportWeatherLogsExcel(data: WeatherLogDocument[]): Promise<Buffer> {
    const workbook = new exceljs.Workbook()
    const sheet = workbook.addWorksheet('Weather Logs')

    sheet.columns = [
      { header: 'ID', key: 'id', width: 32 },
      { header: 'Temperature', key: 'temperature', width: 15 },
      { header: 'Humidity', key: 'humidity', width: 15 },
      { header: 'Wind Speed', key: 'windSpeed', width: 15 },
      { header: 'Condition', key: 'weatherCondition', width: 20 },
      { header: 'Code', key: 'weatherCode', width: 10 },
      { header: 'Precipitation', key: 'precipitationProbability', width: 15 },
      { header: 'Created At', key: 'createdAt', width: 30 },
    ]

    data.forEach((item) => {
      sheet.addRow(this.mapWeatherLog(item))
    })

    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}
