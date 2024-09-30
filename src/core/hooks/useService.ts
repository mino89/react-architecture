import { interfaces } from "inversify";
import { diContainer } from "../di/container";

/**
 * 
 * @param id the id of service in the DI container 
 * @returns the service instance
 */
export function useService<T>(id: interfaces.ServiceIdentifier<T>): T {
  return diContainer.get<T>(id);
}