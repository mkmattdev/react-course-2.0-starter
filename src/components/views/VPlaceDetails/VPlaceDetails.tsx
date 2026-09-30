import { useParams } from "react-router";
import { MNotFound } from "@/components/molecules/MNotFound/MNotFound";
import { OPlaceDetails } from "@/components/organisms/OPlaceDetails/OPlaceDetails";

export const VPlaceDetails = () => {
  const { placeId } = useParams();
  if (!placeId) return <MNotFound />;

  return <OPlaceDetails placeId={placeId} />;
};
