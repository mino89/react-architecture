import { injectable } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";

@injectable()
export class AuthService {
  isLoggedIn = this.checkLoggedIn();
  get authData() {
    return this.getAuthData();
  }

  constructor() {
    makeAutoObservable(this);
  }

  private checkLoggedIn() {
    return (() => {
      const userCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="));
      const passwordCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("password="));
      if (!userCookie || !passwordCookie) {
        return false;
      }
      const expirationDate = new Date(
        new Date(
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("expires="))
            ?.toString() ?? ""
        )
      );
      console.log("checkloggedin", expirationDate, new Date());
      return expirationDate > new Date();
    })();
  }

  logIn(user: string, password: string) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    document.cookie = `user=${user}; path=/; expires=${expirationDate.toUTCString()}`;
    document.cookie = `password=${this.encryptPassword(password)}; path=/; expires=${expirationDate.toUTCString()}`;
    document.cookie = `expires=${expirationDate.toUTCString()}; path=/; expires=${expirationDate.toUTCString()}`;

    runInAction(() => {
      this.isLoggedIn = this.checkLoggedIn();
    });
  }

  logOut() {
    document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `password=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    document.cookie = `expires=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
  }

  private getAuthData() {
    const userCookie =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1] ?? "";
    const passwordCookie =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("password="))
        ?.split("=")[1] ?? "";
    return {
      user: userCookie,
      password: this.decryptPassword(passwordCookie),
    };
  }

  encryptPassword(password: string): string {
    return btoa(password);
  }

  decryptPassword(encryptedPassword: string): string {
    return atob(encryptedPassword);
  }
}
