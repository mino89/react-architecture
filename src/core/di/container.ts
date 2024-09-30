import { Container, interfaces } from "inversify";
import { DiItem } from "./_types";
import { appConfig } from "../../app-config";

/**
 * Generates the DI configuration.
 * @param diConfig {interfaces.Abstract<unknown>[]} - The DI configuration.
 * @returns {Container} - The DI container.
 */
export function generateDiConfig(diConfig: DiItem[]): Container {
  if (!diConfig) {
    throw new Error("DI configuration is missing");
  }
  const container = new Container();
  diConfig.forEach((item) => {
    container.bind(item).to(item as interfaces.Newable<unknown>).inSingletonScope();
  });
  return container;
}

export const diContainer = generateDiConfig(
  appConfig.di
)