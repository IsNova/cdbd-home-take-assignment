import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  parentId: string;
}
