"use client";
import React, { useState } from "react";
import GoogleAddressSearch from "../../_components/GoogleAddressSearch";
import { Button } from "../../../components/ui/button";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../utils/supabase/client";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";

function AddNewListing() {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const { user } = useUser();
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const nextHandler = async () => {
    // console.log(selectedAddress.label, coordinates);
    setLoader(true);

    const { data, error } = await supabase
      .from("listing")
      .insert([
        {
          address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress,
        },
      ])
      .select();

    if (data) {
      // console.log("new data added", data);
      setLoader(false);

      toast("Nouvelle annonce créée.");
      router.replace("/edit-listing/" + data[0].id);
    }
    if (error) {
      // console.log("error when creating new data", error);
      setLoader(false);

      toast("Erreur lors de la création de l'annonce.");
    }
  };

  return (
    <div className="mt-10 md:mx-56 lg:mx-80">
      <div className="p-10 flex flex-col gap-5 items-center justify-center">
        <h2 className="font-bold text-2xl">CREER UNE ANNONCE</h2>
        <div className="p-5 rounded-ld border w-full shadow-md flex flex-col gap-5">
          <h2 className="text-gray-500">Entrez l'adresse de votre bien </h2>
          <GoogleAddressSearch
            selectedAddress={(value) => setSelectedAddress(value)}
            setCoordinates={(value) => setCoordinates(value)}
          />
          <Button
            disabled={!selectedAddress || !coordinates || loader}
            onClick={nextHandler}
          >
            {loader ? <Loader className="animate-spin" /> : "Suivant"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddNewListing;
