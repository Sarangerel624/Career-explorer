"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useUser } from "@/providers/AuthProviders";
const Page = () => {
  const { push } = useRouter();
  const { token } = useUser();
  const isUser = () => {
    if (token) {
      push("/testSession");
    } else {
      push("/log-in");
    }
  };
  return (
    <div className="absolute inset-0 bg-[url(/bgimage.png)] bg-no-repeat bg-[length:100%_768]">
      <div className="ml-25 mr-25">
        <nav className="flex mt-9 justify-between">
          <p className="font-bold text-[18px]">Career Nova</p>
          <div className="flex gap-8">
            <div>Эхлэл</div>
            <div>Мэргэжлийн тест</div>
            <div>Дадлагын ажил</div>
            <div>Бидний тухай</div>
            <button onClick={() => push("/sign-up")}>Бүртгүүлэх</button>
            <button onClick={() => push("/log-in")}>Нэвтрэх</button>
          </div>
        </nav>
        <p className="flex justify-center font-bold text-[48px] mt-45 mb-2">
          Сонголтоо хялбар,
        </p>
        <p className="flex justify-center font-bold text-[48px]">
          Ирээдүйгээ тод болго
        </p>
        <div className="flex gap-8 justify-center mt-30">
          <Button
            className="border-3 border-[#A4B1FF] bg-[#7489FF] rounded-full hover:bg-indigo-500 h-14  text-[15px]"
            onClick={isUser}
          >
            Мэргэжил Сонголтын тест өгөх
          </Button>
          <Button className="border-3 border-[#A4B1FF] bg-white text-black rounded-full hover:bg-gray-300 h-14 text-[15px]">
            Дэлгэрэнгүй мэдээлэл
          </Button>
        </div>
      </div>
      <div className="responsive bg-[url(/bgimager.png)] bg-no-repeat bg-[length:100%_768]">
        <div className="flex gap-25 justify-center mt-49">
          <div className="flex-row justify-items-center rounded-2xl h-60 w-70 p-10 mb-60 bg-violet-50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out">
            <img src="/ai.svg" className="h-18 mt-2" alt="" />
            <p className="text-[20px] font-semibold mt-3">
              Хиймэл оюун ухаан дээр суурилсан
            </p>
          </div>
          <div className="flex-row justify-items-center rounded-2xl h-60 w-70 p-10 mb-60 bg-violet-50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out">
            <img src="/puzzle.svg" className="h-18 mt-2" alt="" />
            <p className="text-[20px] font-semibold mt-3">
              Хувь хүний зан чанарт тохируулсан
            </p>
          </div>
          <div className="flex-row justify-items-center rounded-2xl h-60 w-70 p-10 mb-60 bg-violet-50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition duration-300 ease-in-out">
            <img src="/network.svg" className="h-18 mt-2" alt="" />
            <p className="text-[20px] font-semibold mt-3">
              Цар хүрээгээ тэлэх боломж
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
