"use client";

import React, { useEffect, useState } from "react";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../../@/components/ui/alert-dialog";

import { Formik } from "formik";
import { Button } from "../../../../components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_components/FileUpload";
import { Loader } from "lucide-react";

function EditListing({ params }) {
  // const params = usePathname();
  const { user } = useUser();
  const router = useRouter();
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);

    if (data) {
      // console.log("here:", data);
      setListing(data[0]);
      setLoading(false);
    }

    if (data?.length <= 0) {
      setLoading(false);
      router.replace("/");
    }
    if (error) {
      console.log("Erreur lors de la vérification de l'utilisateur", error);
      // setLoader(false);
      setLoading(false);
      toast("Erreur lors de la vérification de l'utilisateur.");
    }
  };

  const onSubmitHandler = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params?.id)
      .select();

    if (data) {
      // console.log("data uptaded", data);
      // setLoader(false);
      setLoading(false);
      toast("Annonce modifiée.");
    }
    for (const image of images) {
      const file = image;
      const fileName = Date.now().toString();
      const fileExt = fileName.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${fileName}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        console.log("Erreur lors de l'upload des images.", error);
        setLoading(false);

        toast("Erreur lors de l'upload des images.");
      } else {
        // console.log(data);
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
        // console.log(imageUrl);
        const { data, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params?.id }])
          .select();

        if (error) {
          setLoading(false);
        }

        if (data) {
          // console.log("data uptaded", data);
          // setLoader(false);

          toast("Annonce modifiée.");
          setLoading(false);
        }
      }
      setLoading(false);
    }

    // if (error) {
    //   console.log("Erreur lors de la modification de l'annonce.", error);
    //   // setLoader(false);

    //   toast("Erreur lors de la modification de l'annonce.");
    // }
  };

  const publishBtnHandler = async () => {
    setLoading(true);
    onSubmitHandler();
    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", params?.id)
      .select();

    if (data) {
      setLoading(false);
      toast("Annonce publiée.");
    }
  };

  return (
    <div className="px-10 md:px-36 ">
      <h2 className="font-bolt text-2xl text-center">
        Donnez plus d'informations sur votre bien :
      </h2>
      <Formik
        initialValues={{
          type: listing?.type ? listing?.type : "Rent",
          propertyType: listing?.propertyType
            ? listing?.propertyType
            : "Appartement",
          bedroom: listing?.bedroom ? listing?.bedroom : "0",
          bathroom: listing?.bathroom ? listing?.bathroom : "0",
          parking: listing?.parking ? listing?.parking : "0",
          area: listing?.area ? listing?.area : "0",
          price: listing?.price ? listing?.price : "0",
          hoa: listing?.hoa ? listing?.hoa : "0",
          description: listing?.description ? listing?.description : "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
          active: listing?.active ? listing?.active : true,
        }}
        onSubmit={(values) => {
          console.log(values);
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
                    defaultValue={listing?.type}
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
                    defaultValue={listing?.propertyType}
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing?.propertyType
                            ? listing?.propertyType
                            : "Type du bien"
                        }
                      />
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
                    defaultValue={listing?.bedroom}
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
                    defaultValue={listing?.bathroom}
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
                    defaultValue={listing?.parking}
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
                    defaultValue={listing?.area}
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
                    defaultValue={listing?.price}
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
                      defaultValue={listing?.hoa}
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
                    defaultValue={listing?.description}
                    placeholder="Ecrivez votre message ici "
                    id="description"
                    rows="7"
                    required
                    name="description"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="">
                <h2 className="font-bolt text-2xl my-2 text-center">
                  Déposez les photos de votre bien.
                </h2>
                <FileUpload
                  setImages={(value) => setImages(value)}
                  imageList={listing.listingImages}
                />
              </div>

              <div className="mt-10 flex flex-col gap-7 md:flex-row  md:justify-end ">
                <Button
                  type="submit"
                  // disabled={isSubmitting}
                  disabled={loading}
                  variant="outline"
                  className="text-primary border-primary"
                >
                  Sauvegarder
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  // onClick={() => publishBtnHandler()}
                >
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Sauvegarder & Publier"
                  )}
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
