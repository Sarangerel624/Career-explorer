"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
  return (
    <div className="flex justify-center">
      <div className="p-9 mt-50 flex-col flex justify-items-center items-center bg-white h-600px w-lg rounded-2xl shadow-2xl">
        <p className="mb-7 font-bold text-[22px] flex items-center">Нэвтрэх</p>
        <div className="mt-5 grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Имэйл хаяг</Label>
          <form>
            <Input type="email" id="email" placeholder="Имэйл хаяг" />
          </form>
        </div>
        <div className="mt-5 grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="password">Нууц үг</Label>
          <form>
            <Input type="password" id="password" placeholder="Нууц үг" />
          </form>
        </div>
        <Button className="mt-10 mb-5 bg-[#7489FF] hover:bg-[#6479F4] size-sm w-sm">
          Нэвтрэх
        </Button>
      </div>
    </div>
  );
}

export default Page;
