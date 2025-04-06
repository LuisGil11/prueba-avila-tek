import { OrderStatus } from "@app/orders/domain/value-objects/status";
import { PaginationDto } from "@core/infraestructure/dtos/pagination.dto";

export interface GetAllOrdersDto extends PaginationDto {
  status?: OrderStatus;
}
