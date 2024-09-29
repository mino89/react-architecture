import "reflect-metadata";
import { UserMessagesService } from "./user-messages-service";
import { Usermessage } from "./_types";

describe("UserMessagesService", () => {
  let userMessagesService: UserMessagesService;

  beforeEach(() => {
    userMessagesService = new UserMessagesService();
  });

  it("should set the message", () => {
    const message = { type: "success", message: "test" };
    userMessagesService.setMessage(message as Usermessage);
    expect(userMessagesService.message).toEqual(message);
  });
});
