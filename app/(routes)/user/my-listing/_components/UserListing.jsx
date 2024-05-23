"use client";

import React, { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { supabase } from "../../../../../utils/supabase/client";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, MapPin, Ruler, Trash } from "lucide-react";
import { Button } from "../../../../../components/ui/button";

function UserListing() {
  const [listing, setListing] = useState([]);

  const { user } = useUser();

  useEffect(() => {
    GetUserListing();
  }, [user]);

  const GetUserListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(url,listing_id)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress);

    if (data) {
      console.log("user listing:", data);
      setListing(data);
    }
    if (error) {
      toast("Erreur serveur");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-2xl text-center">Gérer vos annonces</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {listing.length > 0
          ? listing.map((item, index) => (
              <div
                className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg"
                key={index}
              >
                <h2 className="bg-primary text-white absolute px-2 text-sm p-1 rounded-lg m-1 ">
                  {item?.active ? "Publié" : "Non publié"}
                </h2>
                <Image
                  src={
                    item?.listingImages[0]
                      ? item?.listingImages[0]?.url
                      : "/placeholder.png"
                  }
                  width={800}
                  height={150}
                  className="rounded-lg object-cover h-[170px]"
                />
                <div className="flex mt-2 flex-col gap-2">
                  <h2 className="font-bold text-xl">{item?.price} FCFA</h2>
                  <h2 className="flex gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" /> {item?.address}
                  </h2>
                  <div className="flex gap-2 mt-2 justify-between  ">
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md w-full  text-gray-500 justify-center items-center">
                      <BedDouble className="w-4 h-4" />
                      {item?.bedroom}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md w-full  text-gray-500 justify-center items-center">
                      <Bath className="w-4 h-4" />
                      {item?.bathroom}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md w-full  text-gray-500 justify-center items-center">
                      <Ruler className="w-4 h-4" />
                      {item?.area}
                    </h2>
                  </div>
                  <div className="flex gap-2 justify-between">
                    <Link href={"/view-listing/" + item.id} className="w-full">
                      <Button size="sm">Voir</Button>
                    </Link>

                    <Link href={"/edit-listing/" + item.id} className="w-full">
                      <Button size="sm">Editer</Button>
                    </Link>

                    <Link
                      href={"/delete-listing/" + item.id}
                      className="w-full"
                    >
                      <Button size="sm" variant="destructive">
                        <Trash />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="h-[230px] w-full bg-slate-400 animate-pulse rounded-lg gap-4 "
              ></div>
            ))}
      </div>
    </div>
  );
}

export default UserListing;
