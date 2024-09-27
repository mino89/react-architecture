import { injectable } from "inversify";
import { makeAutoObservable } from "mobx";
import { Usermessage } from "./types";


@injectable()
export class UserMessagesService {

    public message!: Usermessage 

    constructor(
    ) {
        makeAutoObservable(this);
    }

    public setMessage(message: Usermessage): void {
        this.message = message;
    }
}