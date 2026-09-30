import { Route, Routes } from "react-router";
import { TAppLayout } from "@/components/templates/TAppLayout/TAppLayout";
import { VPlaces } from "@/components/views/VPlaces/VPlaces";
import { VPlaceDetails } from "@/components/views/VPlaceDetails/VPlaceDetails";
import { VNotFound } from "@/components/views/VNotFound/VNotFound";

export const App = () => (
  <TAppLayout>
    <Routes>
      <Route
        path="/"
        element={<VPlaces />}
      />
      <Route
        path="/places/:placeId"
        element={<VPlaceDetails />}
      />
      <Route
        path="*"
        element={<VNotFound />}
      />
    </Routes>
  </TAppLayout>
);
