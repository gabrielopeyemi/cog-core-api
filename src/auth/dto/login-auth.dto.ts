import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginAuthDto {
  @ApiProperty({
    description: 'username',
    default: 'adewale@yupmail.com',
  })
  @IsNotEmpty()
  credential: string;

  @ApiProperty({
    default: 'Adewale@12',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
