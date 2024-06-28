import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

export class PagenationRequestDto {
  @Min(1)
  @Type(() => Number)
  @IsOptional()
  page: number = 1;

  @Min(1)
  @Type(() => Number)
  @IsOptional()
  limit: number = 10;

  getOffset() {
    return (this.page - 1) * this.limit;
  }
}
