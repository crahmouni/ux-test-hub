import { useParams } from "react-router-dom";
import { PageLayout } from "../components/layouts";
import { PrototypeDetail } from "../components/prototypes";

function PrototypeDetailPage() {
  const { id } = useParams();

  return (
    <PageLayout title={<h1>HOLI</h1>}>
      <PrototypeDetail id={id} />
    </PageLayout>
  )
}

export default PrototypeDetailPage;