import { ParseUUIDPipe } from '@nestjs/common';
import type { ArgumentMetadata } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override transform(value: string | undefined, metadata: ArgumentMetadata): Promise<any> {
    if (value === undefined || value === null || value === '') {
      return Promise.resolve(value);
    }

    return super.transform(value, metadata);
  }
}
