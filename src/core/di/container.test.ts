import "reflect-metadata";
import { generateDiConfig } from "./container";
import { injectable } from "inversify";

@injectable()
export class TestDiContainer {
  public test() {
    return "test";
  }
}

describe("DI Container ", () => {
  it("should retrieve the service instance from the DI container", () => {
    const mockContainer = new TestDiContainer();
    const diConfig = [
     TestDiContainer
    ];
    const container = generateDiConfig(diConfig);
    
    expect(container.get(TestDiContainer)).toEqual(mockContainer);
    expect(container.get(TestDiContainer).test()).toEqual("test");
  });
});
