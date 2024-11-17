import React, { ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { CNPJ } from "../utils/masks/cnpj";
import { AuthService } from "../services/auth/auth.service";
import { AuthDto, type } from "../services/auth/dto/auth.dto";

export default function Login() {
  const auth = new AuthService();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<type>(type.USER);
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    remember: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { identifier, password } = formData;

    const data = {
      identifier,
      password,
      type: userType,
    };

    auth.auth(data);
    console.log("Login:", { data });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    if (userType === type.INSTITUTION) {
      const cnpj = CNPJ(value);
      console.log(cnpj);
      value = cnpj;
    }

    setFormData({ ...formData, identifier: value });
  };

  return (
    <div className="flex items-center justify-center w-screen h-[80vh] bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-md shadow-md">
        <div className="w-full mb-6">
          <div className="flex items-center justify-center p-3 space-x-4 bg-gray-100 rounded-lg">
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === type.USER ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setUserType(type.USER)}
            >
              Usuário
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === type.INSTITUTION ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setUserType(type.INSTITUTION)}
            >
              Instituição
            </button>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
              {userType === type.USER ? "E-mail" : "CNPJ"}
            </label>
            <div className="mt-1">
              <input
                id="identifier"
                name="identifier"
                type={userType === type.USER ? "email" : "text"}
                autoComplete={userType === type.USER ? "email" : "off"}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.identifier}
                onChange={e => handleChange(e)}
                placeholder={userType === type.USER ? "seu@email.com" : "00.000.000/0000-00"}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                checked={formData.remember}
                onChange={e => setFormData({ ...formData, remember: e.target.checked })}
              />
              <label htmlFor="remember" className="block ml-2 text-sm text-gray-900">
                Lembrar de mim
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
