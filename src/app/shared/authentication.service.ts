import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import jwt_decode from "jwt-decode";

interface Token {
  exp: number;
  user: {
    id: string;
  };
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  private api: string =
    "https://bookstore21.s1810456020.student.kwmhgb.at/api/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.api}/login`, {
      email: email,
      password: password
    });
  }

  public setLocalStorage(token: string) {
    console.log("storing token");

    const decodedToken = jwt_decode(token) as Token;
    console.log(jwt_decode(token));
    localStorage.setItem("token", token);
    localStorage.setItem("userId", decodedToken.user.id);
 
 
  }

  public getCurrentUserId() {
    return Number.parseInt(sessionStorage.getItem("userId"));

  }

  logout() {
    this.http.post(`$this.api/logout`, {});
    sessionStorage.removeItem("userId");
    console.log("logged out");
  }
}
