import { useState, FormEvent } from "react";
import { EmployeeService } from "../services/employee/employee.service";
import { EmployeeDto } from "../services/employee/dto/employee.dto";
import { EmployeeCreateDTO } from "../services/employee/dto/employee.create.dto";
import { Role } from "../services/employee/enum/role";
import useBranchStore from "../hooks/use-branch/use-branch";
import { CourseDTO } from "../services/course/dto/course.dto";

interface EmployeeFormProps {
  employees: EmployeeDto[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeDto[]>>;
  courses: CourseDTO[];
}

export function EmployeeForm({ employees, setEmployees, courses }: EmployeeFormProps) {
  const branchId = useBranchStore(state => state.getBranch());
  const [name, setName] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<Role>(Role.USER);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const [address, setAddress] = useState({
    country: "",
    city: "",
    state: "",
    neighborhood: "",
    number: 0,
    CEP: "",
    street: "",
  });

  const employeeService = new EmployeeService();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!branchId) {
      alert("BranchId não disponível. Verifique sua autenticação.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Token não encontrado. Faça login novamente.");
      return;
    }

    try {
      const newEmployee: EmployeeCreateDTO = {
        name,
        rg,
        cpf,
        bornDate: new Date(bornDate),
        email,
        password,
        phoneNumber,
        adressDto: {
          country: address.country,
          city: address.city,
          state: address.state,
          neighborhood: address.neighborhood,
          number: address.number,
          CEP: address.CEP,
          street: address.street,
        },
      };

      const payload = {
        branchId,
        role,
        newEmployee,
        selectedCourseId: role === Role.STUDENT ? selectedCourseId : null,
      };

      console.log("Payload enviado:", payload);

      const data = await employeeService.create({ branchId, role }, newEmployee, token, selectedCourseId);
      setEmployees([...employees, data]);

      alert("Funcionário adicionado com sucesso!");
      resetForm();
    } catch (error) {
      console.error("Erro ao adicionar funcionário:", error);
      alert("Falha ao adicionar funcionário.");
    }
  };

  const resetForm = () => {
    setName("");
    setRg("");
    setCpf("");
    setBornDate("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setRole(Role.USER);
    setSelectedCourseId("");
    setAddress({
      country: "",
      city: "",
      state: "",
      neighborhood: "",
      number: 0,
      CEP: "",
      street: "",
    });
  };

  const inputClass =
    "mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">Adicionar Usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campos pessoais */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nome Completo
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o nome completo"
            />
          </div>
          <div>
            <label htmlFor="rg" className="block text-sm font-medium text-gray-700">
              RG
            </label>
            <input
              id="rg"
              type="text"
              value={rg}
              onChange={e => setRg(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o RG"
            />
          </div>
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
              CPF
            </label>
            <input
              id="cpf"
              type="text"
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o CPF"
            />
          </div>
          <div>
            <label htmlFor="bornDate" className="block text-sm font-medium text-gray-700">
              Data de Nascimento
            </label>
            <input
              id="bornDate"
              type="date"
              value={bornDate}
              onChange={e => setBornDate(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite a senha"
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Telefone
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
              required
              className={inputClass}
              placeholder="Digite o telefone"
            />
          </div>

          {/* Seleção do papel */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Papel
            </label>
            <select
              id="role"
              value={role}
              onChange={e => setRole(e.target.value as Role)}
              required
              className={inputClass}
            >
              <option value={Role.USER}>Usuário</option>
              <option value={Role.ADMIN}>Administrador</option>
              <option value={Role.STUDENT}>Estudante</option>
            </select>
          </div>

          {/* Campo adicional para estudantes */}
          {role === Role.STUDENT && (
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                Curso
              </label>
              <select
                id="course"
                value={selectedCourseId}
                onChange={e => setSelectedCourseId(e.target.value)}
                required
                className={inputClass}
              >
                <option value="" disabled>
                  Selecione um curso
                </option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Campos de endereço */}
          <fieldset className="p-4 border">
            <legend className="text-sm font-medium text-gray-700">Endereço</legend>
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                País
              </label>
              <input
                id="country"
                type="text"
                value={address.country}
                onChange={e => setAddress({ ...address, country: e.target.value })}
                className={inputClass}
                placeholder="Digite o país"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                Cidade
              </label>
              <input
                id="city"
                type="text"
                value={address.city}
                onChange={e => setAddress({ ...address, city: e.target.value })}
                className={inputClass}
                placeholder="Digite a cidade"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <input
                id="state"
                type="text"
                value={address.state}
                onChange={e => setAddress({ ...address, state: e.target.value })}
                className={inputClass}
                placeholder="Digite o estado"
              />
            </div>
            <div>
              <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">
                Bairro
              </label>
              <input
                id="neighborhood"
                type="text"
                value={address.neighborhood}
                onChange={e => setAddress({ ...address, neighborhood: e.target.value })}
                className={inputClass}
                placeholder="Digite o bairro"
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                Rua
              </label>
              <input
                id="street"
                type="text"
                value={address.street}
                onChange={e => setAddress({ ...address, street: e.target.value })}
                className={inputClass}
                placeholder="Digite a rua"
              />
            </div>
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Número
              </label>
              <input
                id="number"
                type="number"
                value={address.number}
                onChange={e => setAddress({ ...address, number: +e.target.value })}
                className={inputClass}
                placeholder="Digite o número"
              />
            </div>
            <div>
              <label htmlFor="CEP" className="block text-sm font-medium text-gray-700">
                CEP
              </label>
              <input
                id="CEP"
                type="text"
                value={address.CEP}
                onChange={e => setAddress({ ...address, CEP: e.target.value })}
                className={inputClass}
                placeholder="Digite o CEP"
              />
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full px-4 py-3 text-white transition bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Adicionar Funcionário
          </button>
        </form>
      </div>
    </div>
  );
}
