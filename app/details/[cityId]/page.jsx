import DetailPage from "../../../pages/DetailPage";

export default function DetailsPageWrapper({ params }) {
  return <DetailPage cityId={params.cityId} />;
}
