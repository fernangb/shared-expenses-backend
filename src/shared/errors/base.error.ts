import { ApiProperty } from '@nestjs/swagger';

interface BaseErrorProps {
  statusCode: number;
  message: string;
}

export class BaseErrorOutput {
  @ApiProperty({
    description: 'The status code error',
    example: 400,
  })
  statusCode: number;

  @ApiProperty({
    description: 'The error message',
    example: 'Some error happened',
  })
  message: string;

  constructor(props: BaseErrorProps) {
    this.statusCode = props.statusCode;
    this.message = props.message;
  }
}
