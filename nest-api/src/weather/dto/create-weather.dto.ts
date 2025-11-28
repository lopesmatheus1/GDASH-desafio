import { Type } from 'class-transformer'
import { IsDefined, IsNumber, IsString, Min, Max } from 'class-validator'

export class CreateWeatherDto {
  @IsDefined()
  @Type(() => Number)
  @IsNumber({}, { message: 'temperature must be a number' })
  temperature: number

  @IsDefined()
  @Type(() => Number)
  @IsNumber({}, { message: 'humidity must be a number' })
  @Min(0)
  @Max(100)
  humidity: number

  @IsDefined()
  @Type(() => Number)
  @IsNumber({}, { message: 'windSpeed must be a number' })
  windSpeed: number

  @IsDefined()
  @IsString({ message: 'weatherCondition must be a string' })
  weatherCondition: string

  @IsDefined()
  @Type(() => Number)
  @IsNumber({}, { message: 'weatherCode must be an integer' })
  weatherCode: number

  @IsDefined()
  @Type(() => Number)
  @IsNumber({}, { message: 'precipitationProbability must be an integer' })
  @Min(0)
  @Max(100)
  precipitationProbability: number
}
