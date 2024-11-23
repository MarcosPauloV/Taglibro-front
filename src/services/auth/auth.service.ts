import AxiosService from "../axios.service";
import { AuthDto } from "./dto/auth.dto";
import { Token } from "./dto/token.dto";

export class AuthService extends AxiosService {
  constructor() {
    super("http://localhost:8080/auth");
  }

  async auth(data: AuthDto): Promise<Token> {
    const res = await this.rest.post("/sign-in", data);

    return res.data as Token;
  }
}
