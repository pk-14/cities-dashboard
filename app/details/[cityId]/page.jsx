"use client";

import DetailsPage from "../../../components/details-page/DetailsPage";
import { useParams } from "next/navigation";

export default function DetailsPageWrapper() {
  const { cityId } = useParams();
  return <DetailsPage cityId={cityId} />;
}
