import { ParseEnumPipe } from '@nestjs/common';
import type { ArgumentMetadata } from '@nestjs/common';

export class OptionalParseEnumPipe<T = any> extends ParseEnumPipe<T> {
  override transform(value: T, metadata: ArgumentMetadata): Promise<T> {
    if (typeof value === 'undefined') {
      return Promise.resolve(value);
    }

    return super.transform(value, metadata);
  }
}
