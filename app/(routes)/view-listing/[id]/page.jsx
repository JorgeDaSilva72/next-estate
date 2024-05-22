"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import Slider from "../_components/Slider";
import Details from "../_components/Details";

const ViewListing = ({ params }) => {
  const [listingDetail, setListingDetail] = useState();

  useEffect(() => {
    GetListingDetail();
  }, []);

  const GetListingDetail = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("id", params.id)
      .eq("active", true);

    if (data) {
      console.log("here:", data);
      setListingDetail(data[0]);
      console.log("data0", data[0]);

      //   setLoading(false);
    }

    // if (data?.length <= 0) {
    //   setLoading(false);
    //   router.replace("/");
    // }
    if (error) {
      console.log("Erreur Serveur lors du fetch detail listing ", error);
      // setLoader(false);
      //   setLoading(false);
      toast("Erreur Serveur.");
    }
  };
  return (
    <div className="px-4 md:px-32 lg:px-56 my-3">
      <Slider images={listingDetail?.listingImages} />
      <Details listingDetail={listingDetail} />
    </div>
  );
};

export default ViewListing;
