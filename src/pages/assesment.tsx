import { AssessmentForm } from "../components/assesment-form";
import { AssessmentList } from "../components/assesment-list";
import useModuleStore from "../hooks/use-module/use-module";

function Assesment() {
  const { modules } = useModuleStore();

  return (
    <>
      <AssessmentForm modules={modules} />
      <AssessmentList />
    </>
  );
}

export default Assesment;
