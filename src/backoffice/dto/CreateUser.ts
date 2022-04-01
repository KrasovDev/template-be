export interface Data {
  firstName: string;
  lastName: string;
  country: string;
  phone: string;
  emailAddress: string;
  language: string;
  value: string;
  type: string;
  citizenship: string;
  birthDay?: number;
  birthMonth?: number;
  birthYear?: number;
  marital: string;
  politicallyExposedNames?: any;
  street1: string;
  city: string;
  province: string;
  postalCode: string;
  status: string;
  broker?: boolean;
  company: string;
  position: string;
  investmentObjectives: string;
  investmentExperience: string;
  annualIncome?: number;
  networthLiquid?: number;
  networthTotal?: number;
  riskTolerance: string;
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
  signedBy: string;
}

export interface Document {
  type: string;
  data: Data;
}

export interface CreateUserDTO {
  username: string;
  password: string;
  userType: string;
  parentIBID: string;
  wlpID: string;
  documents: Document[];
}
