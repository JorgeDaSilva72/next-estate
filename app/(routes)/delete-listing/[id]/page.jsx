"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../../utils/supabase/client";

function DeleteListing({ params }) {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && verifyUserRecordAndDelete();
  }, [user]);

  const verifyUserRecordAndDelete = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (error) {
      console.log("Erreur lors de la vérification de l'utilisateur", error);
      toast("Erreur serveur");
      router.replace("/");
    }

    if (data?.length <= 0) {
      router.replace("/");
    }

    if (data) {
      // console.log("here:", data);

      const { error2 } = await supabase
        .from("listingImages")
        .delete()
        .eq("listing_id", params.id);

      if (error2) {
        console.log("Erreur lors de la suprresion des images", error2);
        toast("Erreur serveur");
        router.replace("/");
      }
      const { error3 } = await supabase
        .from("listing")
        .delete()
        .eq("id", params.id);

      if (error3) {
        console.log("Erreur lors de la suprresion de l'annonce", error3);
        toast("Erreur serveur");
        router.replace("/");
      }
      console.log("Annonce supprimé");
      toast("Annonce supprimé");
      router.replace("/");
    }
  };

  return <p className=""></p>;
}

export default DeleteListing;
