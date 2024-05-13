"use client";

import React, { useEffect } from "react";
// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../../../../@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../@/components/ui/radio-group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../@/components/ui/select";

import { Input } from "../../../../@/components/ui/input";

import { Textarea } from "../../../../@/components/ui/textarea";
import { Formik } from "formik";
import { Button } from "../../../../components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function EditListing({ params }) {
  // const params = usePathname();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data?.length <= 0) {
      router.replace("/");
    }
  };

  const onSubmitHandler = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (data) {
      // console.log("data uptaded", data);
      // setLoader(false);

      toast("Annonce modifiée.");
    }
    if (error) {
      console.log("error when creating new data", error);
      // setLoader(false);

      toast("Erreur lors de la modification de l'annonce.");
    }
  };

  return (
    <div className="px-10 md:px-36 ">
      <h2 className="font-bolt text-2xl">
        Donnez plus d'informations sur votre bien :
      </h2>
      <Formik
        initialValues={{
          type: "Rent",
          propertyType: "",
          bedroom: "0",
          bathroom: "0",
          parking: "0",
          area: "0",
          price: "0",
          hoa: "0",
          description: "",
        }}
        onSubmit={(values) => {
          // console.log(values);
          onSubmitHandler(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">
                    Voulez-vous louer ou vendre votre bien ?
                  </h2>
                  <RadioGroup
                    defaultValue="Rent"
                    onValueChange={(v) => (values.type = v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Louer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Vendre</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">
                    Quel est le type du bien ?
                  </h2>
                  <Select
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Appartement">Appartement</SelectItem>
                      <SelectItem value="Maison">Maison</SelectItem>
                      <SelectItem value="Terrain">Terrain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
                {/* <div className="flex flex-col gap-2"> */}
                {/* Chambre */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="bedroom">Chambre</Label>
                  <Input
                    min={0}
                    type="number"
                    id="bedroom"
                    name="bedroom"
                    placeholder="Chambres"
                    onChange={handleChange}
                  />
                </div>
                {/* </div> */}
                {/* <div className="flex flex-col gap-2"> */}
                {/* Salle de bain */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="bathroom">Salle de bain</Label>
                  <Input
                    min={0}
                    type="number"
                    id="bathroom"
                    name="bathroom"
                    placeholder="Salle de bain"
                    onChange={handleChange}
                  />
                </div>
                {/* </div> */}
                {/* <div className="flex flex-col gap-2"> */}
                {/* Parking */}
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="parking">Parking</Label>
                  <Input
                    min={0}
                    type="number"
                    id="parking"
                    name="parking"
                    placeholder="Parking"
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="price">Surface en m²</Label>
                  <Input
                    min={0}
                    type="number"
                    id="area"
                    name="area"
                    placeholder="Surface en m²"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="price">Prix de vente en $</Label>
                  <Input
                    min={0}
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Prix de vente en $"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="hoa">Charges par mois en $</Label>
                    <Input
                      min={0}
                      type="number"
                      id="hoa"
                      name="hoa"
                      placeholder="Charges par mois en $"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1  gap-2 mt-10">
                <div className="grid w-full gap-1.5">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    placeholder="Ecrivez votre message ici "
                    id="description"
                    rows="7"
                    required
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="mt-10 flex gap-7 justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Sauvegarder
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  Sauvegarder & Publier
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default EditListing;
