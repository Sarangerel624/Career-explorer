"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/AuthProviders";
import Headers from "./_components/Header";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import HomeHeader from "./_components/HomeHeader";
type UsersCommentType = {
  text: string;
  userId: string;
  createdAt: Date;
  username: string;
};
const Page = () => {
  const { push } = useRouter();
  const { token } = useUser();

  const [userComments, setUserComments] = useState<UsersCommentType[]>([]);

  const allComments = async () => {
    const response = await fetch("api/comment");
    if (response.ok) {
      const res = await response.json();
      setUserComments(res);
    }
  };

  useEffect(() => {
    allComments();
  }, []);

  console.log(userComments);

  const isUser = () => {
    if (token) push("/testSession");
    else {
      toast.error("Та нэвтрээгүй байна. Нэвтэрсний дараа тест өгнө үү.");
      push("/log-in");
    }
  };
  const isLogin =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <div className="min-h-screen w-full  from-white to-purple-100 bg-[url('/blue6.jpg')] bg-cover bg-center text-center pb-70">
      {isLogin ? <Headers /> : <HomeHeader />}
      <section className="w-full bg-center text-center py-40 pb-70">
        <div
          className=" text-[70px] leading-tight  text-glow-blue 
  text-glow-dark-blue font-extrabold text-blue-200 transition-all duration-300"
        >
          Сонголтоо хялбар,
          <br />
          Ирээдүйгээ тод болго
        </div>
        <div className="font-bold text-[25px] leading-tight break-normal md:break-all mt-10 text-white">
          Мэргэжлийн сонголтын тест өгч, хувийн <br /> онцлог, чадвараа олж
          мэдэх боломжтой
        </div>

        <div className="flex gap-8 justify-center mt-10 text-white text-glow-white ">
          <button
            className=" relative rounded-full h-14 px-8 text-[16px] font-extrabold text-white bg-indigo-500 border border-indigo-300 transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)] text-glow-hover hover:text-white hover:bg-blue-950 "
            onClick={isUser}
          >
            {" "}
            Мэргэжил Сонголтын тест өгөх{" "}
          </button>
        </div>
      </section>
      <section className=" bg-center -mt-20">
        <div className="text-[60px] text-white font-bold text-shadow-card-foreground bit-white-glow">
          Бидний онцлог
        </div>
        <div className="text-[25px] text-white text-center mt-10">
          Та өөрийн хүсэл сонирхол, чадвар, ур чадвараа тодорхойлж,
          <br /> ажил мэргэжлийн зөв сонголт хийх боломжтой
        </div>
        <div className="flex gap-15 justify-center mt-10">
          {[
            {
              img: "/ai.svg",
              text: "Хиймэл оюун ухаан дээр суурилсан",
            },
            {
              img: "/puzzle.svg",
              text: "Хувь хүний зан чанарт тохируулсан",
            },
            {
              img: "/network.svg",
              text: "Цар хүрээгээ тэлэх боломж",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white rounded-2xl h-60 w-90 p-10 shadow-xl hover:shadow-4xl hover:-translate-y-2 transition duration-300"
            >
              <img src={item.img} className="h-16" alt="" />
              <p className="text-[20px] font-semibold mt-5">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      <section />
      <section className="w-full bg-cover bg-top text-white">
        <div className="py-20 text-[60px] text-white font-bold text-shadow-card-foreground mt-10 bit-white-glow">
          Яаж ажилладаг вэ?
        </div>
        <div className="relative max-w-6xl mx-auto mt-10">
          <div className="absolute left-0 right-0 top-[37px] h-0.5 bg-linear-to-r from-indigo-200 to-indigo-400 z-0"></div>

          <div className="grid grid-cols-4 text-center relative  z-10">
            <div className="flex flex-col items-center px-6">
              <div
                className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-[22px] font-bold
          shadow-[0_0_15px_rgba(59,130,246,0.8)] 
          hover:shadow-[0_0_25px_rgba(59,130,246,1)]
          hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                1
              </div>
              <p className="font-semibold text-[22px] mt-6">Системд нэвтрэх</p>
              <p className="text-gray-300 text-[19px] mt-2">
                Хэрэглэгч системд нэвтэрч, өөрийн мэдээллээ оруулан бүртгүүлнэ.
              </p>
            </div>

            <div className="flex flex-col items-center px-6">
              <div
                className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-[22px] font-bold
          shadow-[0_0_15px_rgba(59,130,246,0.8)] 
          hover:shadow-[0_0_25px_rgba(59,130,246,1)]
          hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                2
              </div>
              <p className="font-semibold text-[22px] mt-6">
                Мэргэжил сонголтын тест өгөх
              </p>
              <p className="text-gray-300 text-[19px] ">
                “Мэргэжил сонгох тест” товч дээр дарж тестээ бөглөж, өөрт
                тохирсон мэргэжлийн үнэлгээг авах боломжтой.
              </p>
            </div>

            <div className="flex flex-col items-center px-3">
              <div
                className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-[22px] font-bold
          shadow-[0_0_15px_rgba(59,130,246,0.8)] 
          hover:shadow-[0_0_25px_rgba(59,130,246,1)]
          hover:scale-110 transition-all duration-300 cursor-pointer "
              >
                3
              </div>
              <p className="font-semibold text-[22px] mt-6">
                Тохирсон мэргэжил, зөвлөгөө харах
              </p>
              <p className="text-gray-300 text-[19px]">
                Тестийн үр дүнд үндэслэн танд тохирсон мэргэжлүүд болон зөвхөн
                танд зориулсан зөвлөгөөг систем харуулна.
              </p>
            </div>

            <div className="flex flex-col items-center px-6">
              <div
                className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-[22px] font-bold
          shadow-[0_0_15px_rgba(59,130,246,0.8)] 
          hover:shadow-[0_0_25px_rgba(59,130,246,1)]
          hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                4
              </div>
              <p className="font-semibold text-[22px] mt-6">
                Дадлагын ажил харах
              </p>
              <p className="text-gray-300 text-[19px] mt-2 ">
                “Дадлагын ажил” цэс рүү орж одоогоор нээлттэй байгаа дадлагын
                боломжуудыг харах, дэлгэрэнгүй мэдээллийг үзэх боломжтой.
              </p>
            </div>
          </div>
          <div className="mt-10">
            <div className="text-[60px] font-bold mt-10 bit-white-glow text-center">
              Бидний зорилго
            </div>
            <div className="text-[20px] leading-relaxed mt-10">
              Ахлах ангийн сурагчдад зориулан тохирох мэргэжлээ олоход нь
              чиглүүлж, ирээдүйн сонголтоо илүү итгэлтэй хийхэд нь туслахыг бид
              зорьдог. Энгийн бөгөөд ойлгомжтой тестүүдээр өөрийн сонирхол,
              давуу талаа таньж, бодит дадлагын хөтөлбөрүүдээр ажил, мэргэжлийн
              амьдралыг ойроос мэдрэх боломжийг бид нэг дор танд хүргэнэ.
            </div>
          </div>
          <div></div>
        </div>
      </section>
      <section className="w-full bg-cover bg-top pt-20">
        <section>
          <div className="text-[60px] font-bold text-center text-blue-200 text-glow-dark-blue">
            Сэтгэгдэл
          </div>
          <div className="text-[26px] text-center text-white mt-5">
            Манай платформыг ашигласан хүмүүсийн бодит сэтгэгдэл
          </div>

          <div className="mt-15 -mb-40">
            <Carousel className="w-full px-7">
              <div className="relative">
                <CarouselContent className="-ml-1">
                  {userComments?.map((item, index) => {
                    const initials = item.username
                      ? item.username
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()
                      : "US";

                    const randomColor = `hsl(${
                      (item.userId.length * 45) % 360
                    }, 70%, 55%)`;

                    return (
                      <CarouselItem
                        key={index}
                        className="ml-8 md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="p-2">
                          <div
                            className="relative border border-gray-200 rounded-xl items-center gap-2 px-7 font-semibold text-black h-80 w-[280px]
              cursor-pointer bg-white
              transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
              hover:brightness-110 hover:-translate-y-0.5 mt-5 pt-10"
                          >
                            <div className="flex items-center gap-2">
                              <div
                                className="h-14 w-14 flex items-center justify-center rounded-2xl text-white font-bold text-xl"
                                style={{ backgroundColor: randomColor }}
                              >
                                {initials}
                              </div>
                              <div>
                                <div className="font-bold text-[20px] text-gray-700">
                                  {item.username}
                                </div>
                              </div>
                            </div>

                            <p className="mt-4 text-gray-700 text-[17px] leading-relaxed">
                              {item.text}
                            </p>

                            <div className="mt-3 text-[16px] text-gray-900">
                              {new Date(item.createdAt).toLocaleDateString(
                                "mn-MN"
                              )}
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>

                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2" />
              </div>
            </Carousel>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Page;
