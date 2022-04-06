import { ApiProperty } from '@nestjs/swagger';

const DocumentSideOptions = ['FRONT', 'BACK'];

const DocumentTypeOptions = [
  'DRIVER_LICENSE',
  'PASSPORT',
  'NATIONAL_ID_CARD',
  'VOTER_ID',
  'WORK_PERMIT',
  'VISA',
  'RESIDENCE_PERMIT',
];

// you can add validate using class-validator
export class UploadDocumentDTO {
  @ApiProperty({ example: '123123123-123123123-123123123' })
  userID: string;

  @ApiProperty({ example: 'PASSPORT', enum: DocumentTypeOptions })
  documentType: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  documentImage: string;

  @ApiProperty({ example: 'FRONT', enum: DocumentSideOptions })
  side: string;
}
