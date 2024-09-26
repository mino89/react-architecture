import { Container } from "inversify";
import { DiItem } from "./types";
import { appConfig } from "../../app-config";

const diContainer = new Container();

function generateDiConfig(diConfig: DiItem[]): void {
  diConfig.forEach((item) => {
    diContainer.bind(item.id).to(item.class).inSingletonScope();
  });
}
generateDiConfig(appConfig.di);

export { diContainer };
