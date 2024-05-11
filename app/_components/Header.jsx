"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function Header() {
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

  return (
    <div className="p-6 px-10 flex justify-between items-center shadow-md fixed top-0 w-full z-10 bg-white ">
      <div className="flex gap-10 items-center">
        <Image
          src={"/logo.png"}
          width={60}
          height={60}
          alt="logo"
          className="bg-primary rounded-lg"
        />
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
      <div className="flex gap-2">
        <Button className="fex gap-2 ">
          <Plus className="h-5 w-5" />
          Créer annonce
        </Button>
        <Button variant="outline">Se connecter</Button>
      </div>
    </div>
  );
}

export default Header;
