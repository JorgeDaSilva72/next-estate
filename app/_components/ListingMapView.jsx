"use client";

import React, { useEffect, useState } from "react";

import Listing from "./Listing";
import GoogleMapSection from "./GoogleMapSection";

import { supabase } from "../../utils/supabase/client";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchedAddress, setSearchedAddress] = useState();
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, setHomeType] = useState();
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("active", true)
      .eq("type", type);

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Erreur serveur");
    }
  };

  const handleSearchClick = async () => {
    console.log("searchedAddress:", searchedAddress);

    const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;
    console.log("searchTerm:", searchTerm);
    console.log("bedCount:", bedCount);
    console.log("bathCount:", bathCount);
    console.log("parkingCount:", parkingCount);
    console.log("homeType:", homeType);

    let query = supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("type", type)
      .eq("active", true)
      .like("address", "%" + searchTerm + "%")
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)

      .order("id", { ascending: false });

    if (homeType) {
      query = query.eq("propertyType", homeType);
    }

    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Erreur serveur");
    }
  };

  return (
    <div className="p-10 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="">
          <Listing
            listing={listing}
            handleSearchClick={handleSearchClick}
            searchedAddress={(v) => setSearchedAddress(v)}
            setBedcount={setBedCount}
            setBathcount={setBathCount}
            setParkingcount={setParkingCount}
            setHomeType={setHomeType}
            setCoordinates={setCoordinates}
          />
        </div>
        {/* <div className="fixed right-10 h-full md:w-[350px] lg:w-[450px] xl:w-[650px]">
          <GoogleMapSection coordinates={coordinates} />
        </div> */}
      </div>
    </div>
  );
}
export default ListingMapView;
