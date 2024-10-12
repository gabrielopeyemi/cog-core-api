import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      name: 'COG core api',
      date: '07 october 2014',
      describe: 'we move'
    };
  }
}
