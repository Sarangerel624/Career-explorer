"use client";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="ml-25 mr-25">
      <nav className="flex mt-9 justify-between">
        <p className="font-bold text-[18px]">Career Nova</p>
        <div className="flex gap-8">
          <div>Эхлэл</div>
          <div>Мэргэжлийн тест</div>
          <div>Дадлагын ажил</div>
          <div>Бидний тухай</div>
          <div>Нэвтрэх</div>
          <div>Бүртгүүлэх</div>
        </div>
      </nav>
      <p className="flex justify-center font-bold text-[48px] mt-50 mb-2">
        Сонголтоо хялбар,
      </p>
      <p className="flex justify-center font-bold text-[48px]">
        Ирээдүйгээ тод болго
      </p>
      <div className="flex gap-3 justify-center mt-30">
        <Button className="bg-sky-500 rounded-full hover:bg-sky-700">
          Мэргэжил Сонголтын тест өгөх
        </Button>
        <Button className="border-2 border-sky-500 bg-white text-black rounded-full hover:bg-white">
          Дэлгэрэнгүй мэдээлэл
        </Button>
      </div>
    </div>
  );
};

export default Page;
