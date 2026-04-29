import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service.js';
import { CategoriesController } from './categories.controller.js';
import { ValidateCategoryOwnershipService } from './services/validate-category-ownership.service.js';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, ValidateCategoryOwnershipService],
  exports: [ValidateCategoryOwnershipService],
})
export class CategoriesModule {}
