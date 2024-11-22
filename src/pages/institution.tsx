import { useEffect, useState } from "react";
import { InstitutionService } from "../services/institution/institution.service";
import { useStorage } from "../hooks/storage/use-sorage";
import { BranchList } from "../components/branch-list";
import { EmployeeList } from "../components/employee-list";
import { BranchDto } from "../services/branch/dto/branch.dto";
import { EmployeeDto } from "../services/employee/dto/employee.dto";
import { BranchService } from "../services/branch/branch.service";
import { EmployeeService } from "../services/employee/employee.service";
import { BranchForm } from "../components/branch-form";
import { EmployeeForm } from "../components/emplouee-form";

function Institution() {
  const institutionService = new InstitutionService();
  const branchService = new BranchService();
  const employeeService = new EmployeeService();

  const { getItem } = useStorage();
  const [branches, setBranches] = useState<BranchDto[]>([]);
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await institutionService.getById(getItem("institutionId"), getItem("token"));

        const branches = await branchService.getAll();
        setBranches(branches);

        const employees = await employeeService.getAll(getItem("institutionId"), getItem("token"));
        setEmployees(employees);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-sm">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="ml-2 text-xl font-bold text-gray-900">Company Dashboard</h1>
              </div>
            </div>
          </div>
        </nav>

        <section className="flex flex-col gap-4 px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <BranchList branches={branches} setBranches={setBranches} />

            <EmployeeList />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <BranchForm employees={branches} setEmployees={setBranches} />
            <EmployeeForm employees={employees} setEmployees={setEmployees} />
          </div>
        </section>
      </div>
    </>
  );
}

export default Institution;
