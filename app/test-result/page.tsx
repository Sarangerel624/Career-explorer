"use client";

import { useUser } from "@/providers/AuthProviders";
import { useState, useEffect } from "react";
import { Briefcase, Star, Book, Building, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { FolderSearch } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Headers from "../_components/Header";
import TopCareerCard from "../_components/TopCareerCard";
import { toast } from "sonner";
const Page = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [loadingComment, setLoadingComment] = useState(false);
  const { user } = useUser();
  const loggedUserId = user?.id;
  const username = user?.username;
  console.log(username, "qwe");
  const { push } = useRouter();

  const [comment, setComment] = useState("");
  const [userComment, setUserComment] = useState("");

  console.log(testResult);
  const postUserComment = async () => {
    if (!comment.trim()) return; 
    setLoadingComment(true); 
    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: loggedUserId,
          comment,
          username,
        }),
      });

      if (response.ok) {
        toast.success("Амжиллттай илгээгдлээ!");
        setComment("");
      } else {
        toast.error("Алдаа гарлаа, дахин оролдоно уу");
      }
    } catch (err) {
      toast.error("Сервертэй холбогдож чадсангүй");
    } finally {
      setLoadingComment(false); 
    }
  };

  useEffect(() => {
    if (!loggedUserId) return;

    const fetchResult = async () => {
      try {
        const response = await fetch(`/api/aiResult?userId=${loggedUserId}`);
        const data = await response.json();
        setTestResult(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResult();
  }, [loggedUserId]);

  if (!testResult) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">
          Таны карьерийн дүгнэлтийг бэлтгэж байна...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/tere4.jpg')] bg-cover bg-top">
      <Headers />

      <main className="max-w-6xl mx-auto pt-16 pb-20 px-6 space-y-14">
        <div className="bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
          <h1 className="flex items-center gap-2 text-3xl text-glow-blue text-glow-hover font-extrabold text-blue-950 transition-all duration-300 cursor-pointer">
            Мэргэжлийн Чиг Баримжааны Тайлан
          </h1>
          <p className="text-gray-700 text-lg">{testResult.summary}</p>

          <div className="mt-6 inline-flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            <Star size={18} />
            {testResult.personalityType}
          </div>
        </div>

        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <Briefcase size={28} className="text-indigo-500 animate-bounce" />
            <h2 className="flex items-center gap-2 text-3xl text-glow-blue text-glow-hover font-extrabold text-blue-200 transition-all duration-300 cursor-pointer">
              Хамгийн Тохиромжтой Мэргэжлүүд
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testResult.topCareers?.map((career: any, idx: number) => (
              <div
                key={idx}
                className="relative overflow-hidden p-6 rounded-2xl shadow-lg border border-gray-200
                 bg-gradient-to-tr from-indigo-50 via-purple-50 to-pink-50 hover:scale-105 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {career.title}
                </h3>
                <p className="text-gray-700 text-sm">{career.reason}</p>

                <TopCareerCard
                  career={career}
                  skills={testResult.recommendedSkills}
                />
              </div>
            ))}
          </div>
        </section>

        {testResult.relatedCareers?.length > 0 && (
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-3xl text-glow-blue text-glow-hover font-extrabold text-blue-200 transition-all duration-300 cursor-pointer">
              Ижил Төстэй Карьерууд
            </h2>

            <div className="flex flex-wrap gap-3">
              {testResult.relatedCareers?.map((item: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-black px-4 py-2 rounded-2xl font-bold"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        )}

        {testResult.recommendedSkills?.length > 0 && (
          <section className="space-y-3">
            <h2 className="flex items-center gap-2 text-3xl text-glow-blue text-glow-hover font-extrabold text-blue-200 transition-all duration-300 cursor-pointer">
              Санал Болгож буй Чадварууд
            </h2>

            <div className="flex flex-wrap gap-3">
              {testResult.recommendedSkills?.map((skill: any, idx: number) => (
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="space-y-6">
          <div className="text-glow-blue text-glow-hover font-extrabold text-blue-200 transition-all duration-300 cursor-pointer flex gap-2">
            <Sparkles />
            <h2 className="text-3xl font-bold">Дадлагын Ажлын Боломжууд</h2>
          </div>
          {
            <Carousel className="w-full max-w-[1300px] mx-auto relative mt-3">
              <CarouselContent className="-ml-4 m-5">
                {testResult.internshipOpportunities.map(
                  (item: any, index: any) => {
                    return (
                      <CarouselItem
                        key={index}
                        className=" basis-full md:basis-1/2 lg:basis-1/4"
                      >
                        <div
                          className="relative border border-gray-200 rounded-xl
            px-10 py-3 h-[220px] w-[260px]
            text-white cursor-pointer bg-gradient-to-r
            shadow-[0_0_15px_rgba(99,102,241,0.45)]
            transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
            hover:brightness-110 hover:-translate-y-[2px] overflow-y-auto scrollbar-hide"
                        >
                          <div>
                            <p className="font-bold text-white text-lg">
                              {item.companyName}
                            </p>
                            <p className="text-sm text-white">{item.title}</p>
                          </div>

                          <div className="mt-3 text-sm text-white space-y-1">
                            <p>
                              <strong>Байршил :</strong> {item.location}
                            </p>

                            <p className="font-semibold">
                              <strong>Цалин:</strong> {item.salaryMNT}
                            </p>

                            <p className="font-semibold">
                              <strong>Notes:</strong> {item.notes}
                            </p>
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  }
                )}
              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          }
        </section>

     
        <section className="space-y-4">
          <div className="flex text-glow-blue text-glow-hover font-extrabold text-blue-200 transition-all duration-300 cursor-pointer gap-2">
            <div className="mt-2">
              <FolderSearch />
            </div>
            <h2 className="text-3xl">Нарийвчилсан Дүгнэлт</h2>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {testResult.description}
            </p>
          </div>
        </section>

        <section className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-white/30 space-y-4 mt-10">
          <h3 className="text-xl font-bold text-gray-800 text-glow-blue">
            Сэтгэгдэл үлдээх
          </h3>

          <Input
            placeholder="Та сэтгэгдлээ бичээрэй..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="
      h-14 text-[16px] px-5 rounded-xl
      border border-indigo-200
      bg-white/80 backdrop-blur-sm
      focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
      shadow-inner
    "
          />

          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-white
    bg-gradient-to-r from-blue-600 to-indigo-600
    shadow-[0_0_15px_rgba(99,102,241,0.45)]
    transition-all duration-300
    hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
    hover:brightness-110 hover:-translate-y-[2px]"
              onClick={postUserComment}
              disabled={loadingComment} 
            >
              Сэтгэгдэл илгээх <ChevronRight size={18} />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Page;
