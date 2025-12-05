"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent } from "react";
import { useUser } from "@/providers/AuthProviders";
import { useRouter } from "next/navigation";
import Headers from "../_components/Header";
import HomeHeader from "../_components/HomeHeader";
function Page() {
  const { newUserSign, user } = useUser();

  const [sign, setSign] = useState({
    email: "",
    password: "",
    username: "",
    lastName: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSign({
      ...sign,
      [name]: value,
    });
  };

  const hangleSign = async () => {
    await newUserSign(sign.email, sign.password, sign.username, sign.lastName);
  };

  const { push } = useRouter();
  return (
    <div className="min-h-screen w-full  from-white to-purple-100 bg-[url('/blue6.jpg')] bg-cover bg-center text-center pb-70">
      <HomeHeader />
      <div className="flex justify-center">
        <div className="p-9 mt-15 h-[550px] w-lg bg-white h-800px rounded-2xl shadow-2xl">
          <p className="mb-7 font-bold text-[22px] flex items-center">
            Бүртгэл
          </p>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Нэр</Label>
            <Input
              type="name"
              id="name"
              placeholder="Нэр"
              name="username"
              value={sign.username}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="lastname">Овог</Label>
            <Input
              type="lastname"
              id="lastname"
              placeholder="Овог"
              name="lastName"
              value={sign.lastName}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="email">Имэйл хаяг</Label>
            <Input
              type="email"
              id="email"
              placeholder="Имэйл хаяг"
              name="email"
              value={sign.email}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <div className="mt-5 grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="password">Нууц үг</Label>
            <Input
              type="password"
              id="password"
              placeholder="Нууц үг"
              name="password"
              value={sign.password}
              onChange={(e) => handleInput(e)}
            />
          </div>
          <Button
            className="mt-10 mb-5 bg-[#7489FF] hover:bg-[#6479F4] size-sm w-sm"
            onClick={hangleSign}
          >
            Бүртгүүлэх
          </Button>
          <div className="text-lg text-gray-900">
            Хэрвээ та бүртгэлтэй бол{" "}
            <span className="text-blue-400" onClick={() => push("/log-in")}>
              нэвтэрнэ
            </span>{" "}
            үү.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
