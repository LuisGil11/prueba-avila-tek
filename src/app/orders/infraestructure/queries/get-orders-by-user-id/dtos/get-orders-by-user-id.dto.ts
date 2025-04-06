import { OrderStatus } from "@app/orders/domain/value-objects/status";
import { PaginationDto } from "@core/infraestructure/dtos/pagination.dto";

export interface GetOrdersByUserIdDto extends PaginationDto {
  id: string;
  status?: OrderStatus;
}
