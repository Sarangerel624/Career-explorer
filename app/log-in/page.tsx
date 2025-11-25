"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/providers/AuthProviders";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
type InputValues = {
  password: string;
  email: string;
};
function Page() {
  const { login, token } = useUser();
  const { push } = useRouter();
  const [checks, setChecks] = useState<InputValues>({
    password: "",
    email: "",
  });

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChecks({
      ...checks,
      [name]: value,
    });
  };
  const handleLogin = async () => {
    await login(checks.email, checks.password);
  };

  return (
    <div className="flex justify-center">
      <div className="p-9 mt-50 flex-col flex justify-items-center items-center bg-white h-600px w-lg rounded-2xl shadow-2xl">
        <p className="mb-7 font-bold text-[22px] flex items-center">Нэвтрэх</p>
        <div className="mt-5 grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="email">Имэйл хаяг</Label>
          <form>
            <Input
              type="email"
              id="email"
              placeholder="Имэйл хаяг"
              name="email"
              value={checks.email}
              onChange={(e) => handleInputValue(e)}
            />
          </form>
        </div>
        <div className="mt-5 grid w-full max-w-sm items-center gap-3">
          <Label htmlFor="password">Нууц үг</Label>
          <form>
            <Input
              type="password"
              id="password"
              placeholder="Нууц үг"
              name="password"
              value={checks.password}
              onChange={(e) => handleInputValue(e)}
            />
          </form>
        </div>
        <Button
          className="mt-10 mb-5 bg-[#7489FF] hover:bg-[#6479F4] size-sm w-sm"
          onClick={handleLogin}
        >
          Нэвтрэх
        </Button>
      </div>
    </div>
  );
}

export default Page;
