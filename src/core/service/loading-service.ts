import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";

export type LoadingState = {
  loadingKey: string;
  state: boolean;
}
@injectable()
export class LoadingService {
  private loadingState: LoadingState = {
    loadingKey: "",
    state: false,
  }

  public get isLoading(): LoadingState {
    return this.loadingState;
  }

  constructor() {
    makeAutoObservable(this);
  }

  public start(key:string): void {
    this.loadingState.state = true;
    this.loadingState.loadingKey = key;
  }

  public stop(key:string): void {
    this.loadingState.state = false;
    this.loadingState.loadingKey = key;
  }
}
