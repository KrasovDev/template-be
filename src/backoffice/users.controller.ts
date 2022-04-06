import { HttpService } from '@nestjs/axios';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import * as FormData from 'form-data';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import * as path from 'path';
import { catchError, of, pluck } from 'rxjs';
import { imageFileFilter } from 'src/utils/file';

import { CreateAccountDTO } from './dto/CreateAccount';
import { CreateUserDTO } from './dto/CreateUser';
import { UploadDocumentDTO } from './dto/UploadDocument';

const prefix = 'back-office';
const dwAuthToken = 'dw-auth-token';

@Controller(prefix)
export class BO_UsersController {
  private BO_API_URL: string;
  private BO_APP_KEY: string;

  public defaultHeaders: Record<string, string>;

  constructor(private http: HttpService) {
    this.BO_API_URL = process.env.BO_API_URL;
    this.BO_APP_KEY = process.env.BO_APP_KEY;

    this.defaultHeaders = {
      'dw-client-app-key': this.BO_APP_KEY,
    };
  }

  @Throttle(100, 30)
  @Get('users/:id')
  getUser(@Headers(dwAuthToken) token: string, @Param('id') id: string) {
    console.log(token);
    return this.http
      .get(`${this.BO_API_URL}/${prefix}/users/${id}`, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(
        pluck('data'),
        catchError((err) => {
          console.log(err);
          return of({ error: 'Error' });
        }),
      );
  }

  @Post('users')
  createUser(@Headers(dwAuthToken) token: string, @Body() body: CreateUserDTO) {
    return this.http
      .post(`${this.BO_API_URL}/${prefix}/users`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Patch('users/:id')
  updateUser(
    @Headers(dwAuthToken) token: string,
    @Param('id') id: string,
    @Body() body: CreateUserDTO,
  ) {
    return this.http
      .patch(`${this.BO_API_URL}/${prefix}/users/${id}`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Get('users/:id/kyc-status')
  getKYCStatus(@Headers(dwAuthToken) token: string, @Param('id') id: string) {
    return this.http
      .get(`${this.BO_API_URL}/${prefix}/users/${id}/kyc-status`, {
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
      .post(`${this.BO_API_URL}/${prefix}/accounts`, body, {
        headers: { ...this.defaultHeaders, [dwAuthToken]: token },
      })
      .pipe(pluck('data'));
  }

  @Post('documents')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('documentImage', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: path.join(__dirname, '../../upload'),
        filename: (req, { originalname }, callback) => {
          callback(
            null,
            `${Date.now()}.${path.basename(
              originalname,
              path.extname(originalname),
            )}${path.extname(originalname)}`,
          );
        },
      }),
    }),
  )
  uploadDocs(
    @Headers(dwAuthToken) token: string,
    @Body() body: UploadDocumentDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(token);
    console.log(body);
    console.log(file);

    const formData = new FormData();
    formData.append('userID', body.userID);
    formData.append('documentType', body.documentType);
    formData.append('side', body.side);
    formData.append('documentImage', createReadStream(file.path));

    return this.http
      .post(`${this.BO_API_URL}/${prefix}/documents`, formData, {
        headers: {
          ...this.defaultHeaders,
          [dwAuthToken]: token,
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      })
      .pipe(
        pluck('data'),
        catchError((err) => {
          const { status, statusText, data } = err.response;
          return of({ error: 'Error', status, statusText, data });
        }),
      );
  }
}
