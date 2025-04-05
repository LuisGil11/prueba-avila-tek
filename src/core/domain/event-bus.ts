export interface EventBus {
  publish(event: unknown, providerId?: string): void;
  on(
    event: string,
    handle: (event: unknown, providerId?: string) => void
  ): void;
}
