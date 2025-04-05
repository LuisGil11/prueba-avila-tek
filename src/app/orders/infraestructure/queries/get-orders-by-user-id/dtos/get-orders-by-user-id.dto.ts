import { PaginationDto } from "@core/infraestructure/dtos/pagination.dto";

export interface GetOrdersByUserIdDto extends PaginationDto {
  id: string;
}
