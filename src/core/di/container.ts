import { Container } from "inversify";
import { DiItem } from "./_types";
import { appConfig } from "../../app-config";

/**
 * Generates the DI configuration.
 * @param diConfig {DiItem[]} - The DI configuration.
 * @returns {Container} - The DI container.
 */
export function generateDiConfig(diConfig: DiItem[]): Container {
  if (!diConfig) {
    throw new Error("DI configuration is missing");
  }
  const container = new Container();
  diConfig.forEach((item) => {
    container.bind(item.id).to(item.class).inSingletonScope();
  });
  return container;
}

export const diContainer = generateDiConfig(
  appConfig.di
)