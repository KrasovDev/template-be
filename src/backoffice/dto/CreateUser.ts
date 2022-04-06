import { ApiProperty } from '@nestjs/swagger';

export class DocumentData {
  @ApiProperty({ example: 'firstName' })
  firstName: string;

  @ApiProperty({ example: 'lastName' })
  lastName: string;

  @ApiProperty({ example: 'country' })
  country: string;

  @ApiProperty({ example: 'phone' })
  phone: string;

  @ApiProperty({ example: 'emailAddress' })
  emailAddress: string;

  @ApiProperty({ example: 'language' })
  language: string;

  @ApiProperty({ example: 'value' })
  value: string;

  @ApiProperty({ example: 'type' })
  type: string;

  @ApiProperty({ example: 'citizenship' })
  citizenship: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;

  @ApiProperty({ example: 'marital' })
  marital: string;
  politicallyExposedNames?: any;

  @ApiProperty({ example: 'street1' })
  street1: string;

  @ApiProperty({ example: 'city' })
  city: string;

  @ApiProperty({ example: 'province' })
  province: string;

  @ApiProperty({ example: 'postalCode' })
  postalCode: string;

  @ApiProperty({ example: 'status' })
  status: string;
  broker?: boolean;

  @ApiProperty({ example: 'company' })
  company: string;

  @ApiProperty({ example: 'position' })
  position: string;

  @ApiProperty({ example: 'investmentObjectives' })
  investmentObjectives: string;

  @ApiProperty({ example: 'investmentExperience' })
  investmentExperience: string;
  annualIncome?: number;
  networthLiquid?: number;
  networthTotal?: number;

  @ApiProperty({ example: 'riskTolerance' })
  riskTolerance: string;

  @ApiProperty({ example: 'fundingSources' })
  fundingSources: string[];
  transferFrequencyPerMonth?: number;
  transferTotalExpected?: number;
  investmentHistory12M?: number;
  termsOfUse?: boolean;
  customerAgreement?: boolean;
  marketDataAgreement?: boolean;
  rule14b?: boolean;
  findersFee?: boolean;
  privacyPolicy?: boolean;
  dataSharing?: boolean;

  @ApiProperty({ example: 'signedBy' })
  signedBy: string;
}

export class Document {
  @ApiProperty({ example: 'username' })
  type: string;

  data: DocumentData;
}

export class CreateUserDTO {
  @ApiProperty({ example: 'username' })
  username: string;

  @ApiProperty({ example: 'password' })
  password: string;

  @ApiProperty({ example: 'wlpID' })
  wlpID: string;

  @ApiProperty({ example: 'parentIBID' })
  parentIBID: string;

  @ApiProperty({ example: 'userType' })
  userType: string;

  @ApiProperty({ example: [] })
  documents: Document[];
}
