import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ConstraintsDto {
  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  timeline?: string;

  @IsOptional()
  @IsString()
  collaborationModel?: string;

  @IsOptional()
  @IsString()
  timezone?: string;
}

export class AnalyzeRequestDto {
  @IsString()
  @IsNotEmpty()
  jobPost!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clientMessages?: string[];

  @IsOptional()
  @IsString()
  teamExpertise?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ConstraintsDto)
  constraints?: ConstraintsDto;
}
