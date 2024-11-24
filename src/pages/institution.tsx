import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { InstitutionService } from "../services/institution/institution.service";
import { BranchService } from "../services/branch/branch.service";
import { useStorage } from "../hooks/use-storage/use-sorage";
import { BranchList } from "../components/branch-list";
import { BranchDto } from "../services/branch/dto/branch.dto";
import { InstitutionDto } from "../services/institution/dto/institution.dto";
import { BranchForm } from "../components/branch-form";

function Institution() {
  const { getItem, setItem } = useStorage();
  const navigate = useNavigate();
  const token = getItem("token");
  const accountId = getItem("accountId");

  const [institution, setInstitution] = useState<InstitutionDto | null>(null);
  const [branches, setBranches] = useState<BranchDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Institution Data
    const fetchInstitution = async () => {
      if (!token || !accountId) {
        console.warn("Token ou AccountId ausentes. Redirecionando...");
        navigate("/login");
        return;
      }

      try {
        const institutionService = new InstitutionService();
        const institutionData = await institutionService.getById(accountId, token);

        setInstitution(institutionData);
        setItem("institutionId", institutionData.id);
      } catch (error) {
        console.error("Erro ao carregar dados da instituição:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchInstitution();
  }, [token, accountId, navigate, setItem]);

  useEffect(() => {
    // Fetch Branch Data
    const fetchBranches = async () => {
      if (!token) {
        console.warn("Token ausente. Redirecionando...");
        navigate("/login");
        return;
      }

      try {
        const branchService = new BranchService();
        const branchData = await branchService.getAll(token);

        setBranches(branchData);
      } catch (error) {
        console.error("Erro ao carregar dados das filiais:", error);
      }
    };

    fetchBranches();
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Carregando dados da instituição...</p>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Erro ao carregar dados da instituição. Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="ml-2 text-xl font-bold text-gray-900">{institution.name}</h1>
          </div>
        </div>
      </nav>
      <section className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2">
          <BranchList branches={branches} setBranches={setBranches} />
          <BranchForm branches={branches} setBranches={setBranches} />
        </div>
      </section>
    </div>
  );
}

export default Institution;
