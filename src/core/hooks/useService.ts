import { diContainer } from "../di/container";

export function useService<T>(id: string): T {
  return diContainer.get<T>(id);
}