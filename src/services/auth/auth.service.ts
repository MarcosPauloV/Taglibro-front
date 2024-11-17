import AxiosController from "../axios.controller";
import LocalStorage from "../local-storage/localstorage.service";
import { AuthDto } from "./dto/auth.dto";

export class AuthService extends AxiosController {
  constructor() {
    super("http://localhost:8080/auth");
  }

  async auth(data: AuthDto): Promise<void> {
    const response = await this.rest.post("/sign-in", data);

    const token = response.data;
    if (token) {
      // Salva o token no localStorage
      LocalStorage.setItem("authToken", `Bearer ${token}`);
      console.log("Token armazenado com sucesso.");
    } else {
      console.error("Nenhum token foi retornado na resposta.");
    }
  }
  catch(error: Error) {
    console.error("Erro durante a autenticação:", error);
  }
}
