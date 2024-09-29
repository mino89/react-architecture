import 'reflect-metadata';
import { LoadingService } from './loading-service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    loadingService = new LoadingService();
  });

  it('should start loading', () => {
    loadingService.start('test');
    expect(loadingService.isLoading).toEqual({ loadingKey: 'test', state: true });
  });

  it('should stop loading', () => {
    loadingService.stop('test');
    expect(loadingService.isLoading).toEqual({ loadingKey: 'test', state: false });
  });
});