import {
  BathIcon,
  BedDouble,
  CarFront,
  Drill,
  Home,
  MapPin,
  Ruler,
} from "lucide-react";
import React from "react";
import GoogleMapSection from "../../../_components/GoogleMapSection";
import AgentDetail from "./AgentDetail";

function Details({ listingDetail }) {
  return (
    listingDetail && (
      <div className="my-6 flex gap-2 flex-col">
        <div className="">
          <h2 className="font-bold text-2xl text-center ">Prix</h2>

          <h2 className="font-bold text-3xl text-center ">
            {listingDetail?.price} FCFA
          </h2>
        </div>
        <div>
          <h2 className="font-bold text-2xl text-center">Adresse</h2>

          <h2 className="text-gray-800 text-lg flex gap-2 justify-center items-center">
            <MapPin />
            {listingDetail?.address}
          </h2>
        </div>
        <hr></hr>
        <div className="mt-4 flex flex-col gap-3"></div>
        <h2 className="font-bold text-2xl text-center"> Caractéristiques</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <Home />
            {listingDetail?.propertyType}
          </h2>
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <Drill />
            {listingDetail?.builtin}
          </h2>
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <Ruler />
            {listingDetail?.area} m²
          </h2>
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <BedDouble />
            {listingDetail?.bedroom}
          </h2>
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <BathIcon />
            {listingDetail?.bathroom}
          </h2>
          <h2 className="flex gap-2 items-center bg-purple-100 rounded-lg p-3 text-primary justify-center ">
            <CarFront />
            {listingDetail?.parking}
          </h2>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl text-center"> Description</h2>
          <p className="mt-4 text-gray-800 text-lg text-center">
            {listingDetail?.description}{" "}
          </p>
        </div>
        <div className="mt-4">
          <h2 className="font-bold text-2xl text-center">
            Localisation sur une carte :
          </h2>
          <p className="text-center">En construction ...</p>
          {/* <div className="mt-4">
            <GoogleMapSection
              coordinates={listingDetail?.coordinates}
              listing={[listingDetail]}
            />
          </div> */}
        </div>
        <div className="">
          <h2 className="font-bold text-2xl text-center">Contact de l'agent</h2>

          <AgentDetail listingDetail={listingDetail} />
        </div>
      </div>
    )
  );
}

export default Details;
