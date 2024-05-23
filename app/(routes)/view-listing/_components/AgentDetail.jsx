import Image from "next/image";
import React from "react";
import { Button } from "../../../../components/ui/button";

function AgentDetail({ listingDetail }) {
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-center  justify-between p-5 rounded-lg shadow-md border my-6  ">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Image
          src={listingDetail?.profileImage}
          alt="profile Image"
          width={60}
          height={60}
          className="rounded-full"
        />
        <div className="">
          <h2 className="text-center text-lg font-bold">
            {listingDetail?.fullName}
          </h2>
          <h2 className="text-gray-500 text-center">
            {listingDetail?.createdBy}
          </h2>
        </div>
      </div>
      <div className="text-center">
        <Button>Envoyer un message</Button>
      </div>
    </div>
  );
}

export default AgentDetail;
