import IIdDto from './IIdDto';

export default interface IProductDto extends IIdDto {
  _idCategory: string;
  description: string;
  amount: number;
  minAmount: number;
  active: boolean;
}
