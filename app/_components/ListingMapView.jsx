"use client";

import React, { useEffect, useState } from "react";

import Listing from "./Listing";
import { supabase } from "../../utils/supabase/client";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("type", type)
      .eq("active", true)
      .order("id", { ascending: false });
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Erreur serveur");
    }
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="">
          <Listing listing={listing} />
        </div>
        <div className="">Map</div>
      </div>
    </div>
  );
}

export default ListingMapView;
