import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../@/components/ui/select";
import { Bath, BedDouble, CarFront } from "lucide-react";

function FilterSection({
  setBedcount,
  setBathcount,
  setParkingcount,
  setHomeType,
}) {
  return (
    <div className="px-3 py-2 grid grid-cols-1 2sm:grid-cols-2 2sm:gap-2  sm:grid-cols-2 sm:gap-2 md:grid-cols-2 md:gap-4">
      <Select onValueChange={setBedcount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Lits" />
        </SelectTrigger>
        <SelectContent className="w-[180px] bg-red-200">
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" />
              4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" />
              5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setBathcount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Salle de bain" />
        </SelectTrigger>
        <SelectContent className="w-[180px]  bg-red-200">
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <BedDouble className="h-5 w-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <Bath className="h-5 w-5 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2 ">
              <Bath className="h-5 w-5 text-primary" />
              4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2 ">
              <Bath className="h-5 w-5 text-primary" />
              5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select onValueChange={setParkingcount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent className="w-[180px]  bg-red-200">
          <SelectItem value="1">
            <h2 className="flex gap-2 ">
              <CarFront className="h-5 w-5 text-primary" />
              1+
            </h2>
          </SelectItem>
          <SelectItem value="2">
            <h2 className="flex gap-2 ">
              <CarFront className="h-5 w-5 text-primary" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2 ">
              <CarFront className="h-5 w-5 text-primary" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2 ">
              <CarFront className="h-5 w-5 text-primary" />
              4+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        onValueChange={(value) =>
          value == "Tout" ? setHomeType(null) : setHomeType(value)
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Type du bien" />
        </SelectTrigger>
        <SelectContent className="w-[180px]  bg-red-200">
          <SelectItem value="Tout">
            <h2 className="flex gap-2  ">Tout</h2>
          </SelectItem>
          <SelectItem value="Appartement">
            <h2 className="flex gap-2 ">Appartement</h2>
          </SelectItem>
          <SelectItem value="Maison">
            <h2 className="flex gap-2 ">Maison</h2>
          </SelectItem>
          <SelectItem value="Terrain">
            <h2 className="flex gap-2 ">Terrain</h2>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterSection;
