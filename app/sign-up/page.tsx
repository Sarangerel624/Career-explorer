"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function Page() {
  return (
    <div className="bg-[url(/backimg.png)]">
      <div className="flex justify-center">
        <div className="p-9 mt-30 flex-col flex justify-items-center items-center bg-white h-800px w-lg rounded-2xl shadow-2xl">
          <p className="mb-7 font-bold text-[22px] flex items-center">
            Бүртгэл
          </p>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Нэр</Label>
            <Input type="name" id="name" placeholder="Нэр" />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="lastname">Овог</Label>
            <Input type="lastname" id="lastname" placeholder="Овог" />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Имэйл хаяг</Label>
            <Input type="email" id="email" placeholder="Имэйл хаяг" />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password">Нууц үг</Label>
            <Input type="password" id="password" placeholder="Нууц үг" />
          </div>
          <Button className="mt-10 mb-5 bg-[#7489FF] hover:bg-[#6479F4] size-sm w-sm">
            Бүртгүүлэх
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Page;
