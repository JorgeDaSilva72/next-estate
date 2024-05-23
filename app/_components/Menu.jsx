"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../../components/ui/button";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const { user, isSignedIn } = useUser();

  return (
    <div className="">
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />
      {open && (
        <div className="absolute bg-black text-white left-0 top-20 w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8 text-xl  z-50">
          <Link href="/">
            <p className="" onClick={() => setOpen((prev) => !prev)}>
              Acheter
            </p>
          </Link>
          <Link href={"/rent"}>
            <p className="" onClick={() => setOpen((prev) => !prev)}>
              Louer
            </p>
          </Link>
          {isSignedIn ? (
            <>
              <Link href={"/add-new-listing"}>
                <p className="" onClick={() => setOpen((prev) => !prev)}>
                  Créer une annonce
                </p>
              </Link>

              <Link href={"/user"}>
                <p className="" onClick={() => setOpen((prev) => !prev)}>
                  Accéder à mon profil
                </p>
              </Link>

              <Link href={"/user/my-listing"}>
                <p className="" onClick={() => setOpen((prev) => !prev)}>
                  Accéder à mes annonces
                </p>
              </Link>

              <Link href={"/user/my-listing"}>
                <div onClick={() => setOpen((prev) => !prev)}>
                  <SignOutButton>Se déconnecter </SignOutButton>
                </div>
              </Link>
            </>
          ) : (
            <Link href={"/sign-in"}>
              <p
                className="hidden 2sm:block "
                onClick={() => setOpen((prev) => !prev)}
              >
                Se connecter
              </p>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
