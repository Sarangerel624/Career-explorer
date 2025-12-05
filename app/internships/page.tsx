"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useUser } from "@/providers/AuthProviders";
import { useState, useEffect } from "react";
import Headers from "../_components/Header";

type IntershipType = {
  id: string;
  title: string;
  company: string;
  organizationInfo: string;
  jobInfo: string[];
  requirements: string[];
  addnationalInfo: string[];
  salary: string;
  imgUrl: string;
  deadline: string;
};

export default function Page() {
  const [allInternships, setInternships] = useState<IntershipType[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  const { push } = useRouter();
  // Load all internships
  const loadInternships = async () => {
    const response = await fetch("/api/intern");
    const data = await response.json();
    setInternships(data);
  };

  // Load saved internships
  const loadSaved = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/savedIntern?userId=${userId}`);
      const data = await res.json();

      const savedArray = Array.isArray(data) ? data : data.saved ?? [];

      const ids = savedArray.map((s: any) => s.internId || s.intern?.id);

      setSavedIds(ids);
    } catch (err) {
      console.log(err);
    }
  };

  // Toggle save
  const toggleSave = async (internId: string) => {
    if (!userId) return;

    const isSaved = savedIds.includes(internId);

    console.log(isSaved);
    console.log(userId);
    try {
      const res = await fetch("/api/savedIntern", {
        method: isSaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, internId }),
      });

      await res.json();

      // Refresh saved IDs from DB
      await loadSaved();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadInternships();
  }, []);

  useEffect(() => {
    if (userId) loadSaved();
  }, [userId]);

  return (
    <div className="min-h-screen bg-[url('/pro3.jpg')] bg-cover bg-top">
      <Headers />

      <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow">
        Сүүлд зарлагдсан ажлын байрууд
      </div>

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allInternships.map((internship) => {
          const isSaved = savedIds.includes(internship.id);

          return (
            <Card
              key={internship.id}
              className="relative border border-gray-200 rounded-xl hover:shadow-md items-center gap-2 px-7 py-3 font-semibold text-white h-[300px] w-[450px]
              cursor-pointer bg-gradient-to-r shadow-[0_0_15px_rgba(99,102,241,0.45)]
              transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
              hover:brightness-110 hover:-translate-y-[2px]"
            >
              {/* Save button */}
              <div className="absolute top-3 right-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => toggleSave(internship.id)}
                      >
                        {isSaved ? (
                          <BookmarkCheck
                            size={24}
                            className="text-yellow-400"
                          />
                        ) : (
                          <Bookmark size={20} className="text-gray-600" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[15px]">
                      <p>{isSaved ? "Хадгалагдсан" : "Хадгалах"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <CardContent
                className="p-6"
                // onClick={() =>
                //   push(`/internships/internship?internId=${internship.id}`)
                // }

                onClick={() => push(`/internships/internship/${internship.id}`)}
              >
                <div className="text-[25px] font-semibold text-white bit-white-glow">
                  {internship.title}
                </div>
                <p className="text-[20px] text-white mt-1">
                  {internship.company}
                </p>

                <p className="text-[17px] text-white mt-3 line-clamp-3">
                  {internship.organizationInfo}
                </p>

                <p className="mt-4 text-[17px] text-gray-200 font-extrabold">
                  Deadline: {internship.deadline}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
