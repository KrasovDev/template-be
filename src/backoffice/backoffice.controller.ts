import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { pluck } from 'rxjs';
import { CreateAccountDTO } from './dto/CreateAccount';
import { CreateUserDTO } from './dto/CreateUser';

const prefix = 'back-office';
const dwAuthToken = 'dw-auth-token';

@Controller(prefix)
export class BackofficeController {
  private BO_URL: string;
  private BO_APP_KEY: string;

  public defaultHeaders: Record<string, string>;

  constructor(private http: HttpService) {
    this.BO_URL = process.env.BO_URL;
    this.BO_APP_KEY = process.env.BO_APP_KEY;

    this.defaultHeaders = {
      'dw-client-app-key': this.BO_APP_KEY,
    };
  }

  @Get('auth')
  getAuthToken() {
    return this.http
      .get(`https://dw-auth.beanstox.dev/get`)
      .pipe(pluck('data'));
  }

  @Post('auth')
  refreshAuthToken() {
    return this.http
      .post(`https://dw-auth.beanstox.dev/refresh`)
      .pipe(pluck('data'));
  }

  @Get('users')
  getUser(@Headers(dwAuthToken) token: string, @Param('id') id: string) {
    return this.http
      .get(`${this.BO_URL}/${prefix}/users/${id}`, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Post('users')
  createUser(@Headers(dwAuthToken) token: string, @Body() body: CreateUserDTO) {
    return this.http
      .post(`${this.BO_URL}/${prefix}/users`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Patch('users')
  // TODO: set correct DTO
  updateUser(@Headers(dwAuthToken) token: string, @Body() body: CreateUserDTO) {
    return this.http
      .patch(`${this.BO_URL}/${prefix}/users`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Get('users/:id/kyc-status')
  getKYCStatus(@Headers(dwAuthToken) token: string, @Param('id') id: string) {
    return this.http
      .get(`${this.BO_URL}/${prefix}/users/${id}/kyc-status`, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Post('accounts')
  createAccount(
    @Headers(dwAuthToken) token: string,
    @Body() body: CreateAccountDTO,
  ) {
    return this.http
      .post(`${this.BO_URL}/${prefix}/accounts`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  // @Post()
  // uploadDocs() {}
}
