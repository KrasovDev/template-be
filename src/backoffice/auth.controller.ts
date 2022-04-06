import { HttpService } from '@nestjs/axios';
import { Controller, Get } from '@nestjs/common';
import { pluck } from 'rxjs';

const prefix = 'back-office';

@Controller(prefix)
export class BO_AuthController {
  private DW_AUTH_URL: string;
  public defaultHeaders: Record<string, string>;

  constructor(private http: HttpService) {
    this.DW_AUTH_URL = process.env.DW_AUTH_URL;
  }

  @Get('auth')
  getAuthToken() {
    return this.http.get(`${this.DW_AUTH_URL}/get`).pipe(pluck('data'));
  }

  @Get('refresh')
  refreshAuthToken() {
    return this.http.get(`${this.DW_AUTH_URL}/refresh`).pipe(pluck('data'));
  }
}
