import { Container } from "inversify";
import { DiItem } from "./_types";
import { appConfig } from "../../app-config";
const diContainer = new Container();
/**
 * Generates the DI configuration.
 * @param diConfig {DiItem[]} - The DI configuration.
 * @returns void
 */
function generateDiConfig(diConfig: DiItem[]): void {
  diConfig.forEach((item) => {
    diContainer.bind(item.id).to(item.class).inSingletonScope();
  });
}
generateDiConfig(appConfig.di);

export { diContainer };
