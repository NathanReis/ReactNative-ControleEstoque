import ICategoryDto from './ICategoryDto';
import IProductDto from './IProductDto';

export default interface IProductWithCategoryDto extends IProductDto {
  category: ICategoryDto;
}
