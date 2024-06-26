"use client";
import { MapPin } from "lucide-react";
import React from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

export default function GoogleAddressSearch({
  selectedAddress,
  setCoordinates,
}) {
  return (
    <div className="flex gap-2 items-center w-full">
      <MapPin className="hidden md:block h-10 w-10 p-2 rounded-l-lg text-primary bg-purple-200" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
        selectProps={{
          placeholder: "Adresse du bien",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            // console.log(place);
            selectedAddress(place);
            geocodeByAddress(place.label)
              .then((result) => getLatLng(result[0]))
              .then(({ lat, lng }) => {
                // console.log(lat, lng);
                setCoordinates({ lat, lng });
              });
          },
        }}
      />
    </div>
  );
}
