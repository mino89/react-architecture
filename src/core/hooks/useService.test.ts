import { diContainer } from "../di/container";
import { useService } from "./useService";

jest.mock("../di/container", () => ({
  diContainer: {
    get: jest.fn(),
  },
}));

describe("useService",() => {
    it("should retrieve the service instance from the DI container", () => {
        const mockService = {method: jest.fn()};
        const serviceId = 'testServiceId';
        (diContainer.get as jest.Mock).mockReturnValue(mockService);
        const service = useService<typeof mockService>(serviceId);

        expect(diContainer.get).toHaveBeenCalledWith(serviceId);
        expect(service).toEqual(mockService);
    });
})