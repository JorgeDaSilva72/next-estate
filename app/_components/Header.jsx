"use client";

// import { Button } from "@/components/ui/button";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { LogIn, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../../components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu";

function Header() {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  console.log(user);
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="flex p-6 px-10 justify-between items-center shadow-md fixed top-0 w-full  bg-white z-50 ">
      <div className="flex  gap-10 items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            width={50}
            height={50}
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
          <Link href={"/rent"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/rent" ? "text-primary" : ""
              }`}
            >
              Louer
            </li>
          </Link>

          <Link href={"/"}>
            <li
              className={`hover:text-primary font-medium text-sm cursor-pointer ${
                path == "/" ? "text-primary" : ""
              }`}
            >
              Acheter
            </li>
          </Link>

          <li className="hover:text-primary font-medium text-sm cursor-pointer">
            Agents
          </li>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        <Link href={"/add-new-listing"}>
          <Button className="flex gap-1  ">
            <Plus className="2sm:hidden h-5 w-5" />
            <p className="hidden 2sm:block">Créer annonce</p>
          </Button>
        </Link>
        {isSignedIn ? (
          // <UserButton />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.imageUrl}
                width={35}
                height={35}
                alt="user profile"
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/user"}>Mon profil </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/user/my-listing"}>Mes annonces </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SignOutButton>Se déconnecter </SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={"/sign-in"}>
            <Button variant="outline" className="flex gap-1  ">
              <LogIn className="2sm:hidden h-5 w-5" />
              <p className="hidden 2sm:block">Se connecter</p>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
