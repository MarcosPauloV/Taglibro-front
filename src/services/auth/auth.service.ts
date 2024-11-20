import AxiosService from "../axios.service";
import LocalStorage from "../../hooks/storage/local-storage";
import { AuthDto } from "./dto/auth.dto";
import { Token } from "./dto/token.dto";

export class AuthService extends AxiosService {
  constructor() {
    super("http://localhost:8080/auth");
  }

  async auth(data: AuthDto): Promise<Token> {
    const res = await this.rest.post("/sign-in", data);

    const response: Token = res.data;

    return response;
  }
}
