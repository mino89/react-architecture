import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { Usermessage } from "./_types";

/**
 * Service for managing user messages.
 * @class UserMessagesService
 * @method setMessage - Sets the message.
 */
@injectable()
export class UserMessagesService {
  /**
   * The message.
   * @type {Usermessage}
   */
  public message: Usermessage = {} as Usermessage;
  constructor() {
    makeAutoObservable(this);
  }
  /**
   * Sets the message.
   * @param message {Usermessage}
   * @returns void
   */
  public setMessage(message: Usermessage): void {
    this.message = message;
  }
}
