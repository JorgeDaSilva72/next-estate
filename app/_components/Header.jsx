"use client";

// import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  console.log(user);
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="p-6 px-10 flex justify-between items-center shadow-md fixed top-0 w-full z-10 bg-white ">
      <div className="flex gap-10 items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={60}
            height={60}
            alt="logo"
            // className="bg-primary rounded-lg"
            className="rounded-lg"
          />
        </Link>
        <span className="hidden lg:block">Krist Immo</span>
        <Image
          className="hidden lg:block"
          src={"/cameroon flag.png"}
          width={60}
          height={60}
          alt="cameroon flag"
        />
        <ul className="hidden md:flex gap-10">
          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/" ? "text-primary" : ""
              }`}
            >
              A Louer
            </li>
          </Link>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            A Vendre
          </li>
          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agents
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="fex gap-2 ">
            <Plus className="h-5 w-5" />
            Créer annonce
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline">Se connecter</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
