import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '../../../shared/database/repositories/categories/categories.repository.js';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAllByUserId(userId: string) {
    return this.categoriesRepository.findAllByUserId(userId);
  }
}
