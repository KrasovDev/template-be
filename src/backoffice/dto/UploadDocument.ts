import { ApiProperty } from '@nestjs/swagger';

// you can add validate using class-validator
export class UploadDocumentDTO {
  @ApiProperty({ example: '123123123-123123123-123123123' })
  userID: string;

  @ApiProperty({ example: 'PASSPORT' })
  documentType: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  documentImage: string;

  @ApiProperty({ example: 'FRONT | BACK' })
  side: string;
}
