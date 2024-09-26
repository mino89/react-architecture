import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

@injectable()
export class LoadingService {
  private loading: boolean = false;

  public get isLoading(): boolean {
    return this.loading;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public start(): void {
    this.loading = true;
  }

  public stop(): void {
    this.loading = false;
  }
}
