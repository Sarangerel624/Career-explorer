"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/providers/AuthProviders";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Headers from "../_components/Header";
import HomeHeader from "../_components/HomeHeader";
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
    <div className=" min-h-screen w-full bg-[url('/blue6.jpg')] bg-cover bg-center text-center pb-16">
      <HomeHeader />
      <div className="flex flex-col justify-center items-center">
        <div className="p-9 mt-30 flex flex-col justify-center items-center bg-white h-[500px] w-[500px] rounded-2xl shadow-2xl">
          <p className="mb-7 font-bold text-[22px]">Нэвтрэх</p>

          <div className="mt-5 w-full max-w-sm">
            <Label htmlFor="email" className="mb-2">
              Имэйл хаяг
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Имэйл хаяг"
              name="email"
              value={checks.email}
              onChange={handleInputValue}
            />
          </div>

          <div className="mt-6 w-full max-w-sm">
            <Label htmlFor="password" className="mb-2">
              Нууц үг
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="Нууц үг"
              name="password"
              value={checks.password}
              onChange={handleInputValue}
            />
          </div>

          <Button
            className="mt-10 mb-5 bg-[#7489FF] hover:bg-[#6479F4] size-sm w-sm"
            onClick={handleLogin}
          >
            Нэвтрэх
          </Button>

          <div className="mt-4 text-gray-900 text-lg">
            Хэрвээ та бүртгэлгүй бол{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => push("/sign-up")}
            >
              бүртгүүлнэ
            </span>{" "}
            үү.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
