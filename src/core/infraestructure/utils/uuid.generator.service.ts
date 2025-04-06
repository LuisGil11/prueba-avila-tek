import { IdGenerator } from "@core/utils/id/id.generator";
import { v4 } from "uuid";

export class UuidGenerator implements IdGenerator {
  generate(): string {
    return v4();
  }
}
