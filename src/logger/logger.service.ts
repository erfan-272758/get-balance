import { ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';

export class MyLogger extends ConsoleLogger {
  log_file = fs.createWriteStream('./log.log', { encoding: 'utf8' });

  log(message: any, context?: string): void;
  log(message: any, ...optionalParams: any[]): void;
  log(message: unknown, context?: unknown, ...rest: unknown[]): void {
    super.log(message, context, ...rest);
    this.log_file.write('\n' + message);
  }
  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    this.log_file.write('\n' + message);
  }
  close() {
    this.log_file.end();
    this.log_file.close();
  }
}
