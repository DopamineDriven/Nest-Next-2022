import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class SignInSwaggerDto {
  @ApiProperty({ type: String })
  email: string;

  @ApiProperty({ type: String })
  password: string;
}
