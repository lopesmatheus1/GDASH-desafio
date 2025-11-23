import { IsDateString, IsNotEmpty } from 'class-validator'

export class GetInsightsDto {
  @IsNotEmpty()
  @IsDateString()
  startDate: string

  @IsNotEmpty()
  @IsDateString()
  endDate: string
}
