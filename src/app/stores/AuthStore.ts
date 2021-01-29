import { RootStore } from "app/stores/RootStore";
import { observable } from "mobx";
import { SignupFormModel, LoginFormModel } from "app/forms";

export class AuthStore {
  @observable state: "loading" | "loggedin" | "unauthed";
  @observable serverResponse: Response;

  @observable signupForm: SignupFormModel;
  @observable loginForm: LoginFormModel;

  constructor(private rootStore: RootStore) {
    this.state = "unauthed";
    this.signupForm = new SignupFormModel();
    this.loginForm = new LoginFormModel();
    this.loadUser();
  }

  loadUser = async () => {
    this.state = "loading";

    try {
      const response = await fetch("/api/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userDoc = await response.json();
      console.log("userdoc", userDoc, response.status);

      switch (response.status) {
        case 401: {
          this.state = "unauthed";
          break;
        }
        case 200: {
          this.state = "loggedin";
          break;
        }
        default: {
          this.state = "unauthed";
          break;
        }
      }
    } catch (e) {
      this.state = "unauthed";
    }
  };

  login = async () => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.loginForm.toDB()),
    });

    console.log("login", response, await response.json());
    this.loadUser();
  };

  signup = async () => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.signupForm.toDB()),
    });

    this.serverResponse = response;
  };
}
