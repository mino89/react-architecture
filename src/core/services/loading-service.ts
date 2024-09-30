import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { LoadingState } from "./_types";
/**
 * Service for managing the loading state.
 * @class LoadingService
 * @method start - Sets the loading state to true.
 * @method stop - Sets the loading state to false.
 * @property {LoadingState} isLoading - The loading state.
 */
@injectable()
export class LoadingService {
  /**
   * The loading state.
   * @type {LoadingState}
   */
  readonly loadingState: LoadingState = {
    loadingKey: "",
    state: false,
  };
  /**
   * Gets the loading state.
   * @returns {LoadingState} - The loading state.
   */
  public get isLoading(): LoadingState {
    return this.loadingState;
  }
  constructor() {
    makeAutoObservable(this);
  }
  /**
   *
   * @param key {string}
   * @returns void
   */
  public start(key: string): void {
    this.loadingState.state = true;
    this.loadingState.loadingKey = key;
  }
  /**
   *
   * @param key {string}
   * @returns void
   */
  public stop(key: string): void {
    this.loadingState.state = false;
    this.loadingState.loadingKey = key;
  }
}
