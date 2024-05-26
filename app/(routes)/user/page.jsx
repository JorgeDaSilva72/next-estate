"use client";

import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";

function User() {
  return (
    <div className="my-6 md:px-10 lg:px-32">
      <h2 className="font-bold text-2xl text-center py-3">MON PROFIL</h2>
      <UserProfile>
        <UserButton.UserProfilePage
          label="Mes annonces"
          labelIcon={<Building2 className="h-5 w-5" />}
          url="my-listing"
        >
          Mes annonces
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
}

export default User;
