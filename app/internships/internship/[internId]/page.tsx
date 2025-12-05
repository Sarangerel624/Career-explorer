"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Headers from "../../../_components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, Send } from "lucide-react";
import { Building2, CalendarDays, Info, ListChecks } from "lucide-react";
import { ClipboardList } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useUser } from "@/providers/AuthProviders";
// Types
interface InternshipType {
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
}

export default function InternshipDetailPage() {
  const [internship, setInternship] = useState<InternshipType | null>(null);
  const [saved, setSaved] = useState(false);
  const { internId } = useParams();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const { user } = useUser();
  const userId = user?.id;

  const getIntern = async () => {
    const res = await fetch(`/api/theInternship?internId=${internId}`);
    const data = await res.json();
    setInternship(data);
  };

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

      await loadSaved();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (internId) getIntern();
    if (userId) loadSaved();
  }, [internId, userId]);

  const initials = (name: string) => {
    if (!name) return "--";
    const parts = name.split(" ");
    if (parts.length >= 2) return parts[0][0] + parts[1][0];
    return name.slice(0, 2).toUpperCase();
  };

  if (!internship)
    return <div className="text-center p-10 text-white">Loading...</div>;
  const isSaved = savedIds.includes(internship.id);
  return (
    <div className="min-h-screen bg-[url('/pro3.jpg')] bg-cover bg-top pb-10">
      <Headers />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <Card className="backdrop-blur-lg bg-white/20 border-white/20 shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-6 text-white">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border border-white/30">
                <AvatarImage src={internship.imgUrl} />
                <AvatarFallback className="text-xl font-bold bg-white/20">
                  {initials(internship.company)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-2xl font-bold bit-white-glow">
                  {internship.title}
                </h2>
                <p className="text-lg opacity-90">{internship.company}</p>
              </div>
            </div>

            <div className="flex gap-4 -mt-3.5">
              <div className="absolute top-3 right-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-10 w-10"
                        onClick={() => toggleSave(internship.id)}
                      >
                        {isSaved ? (
                          <BookmarkCheck
                            size={50}
                            className="text-yellow-400"
                          />
                        ) : (
                          <Bookmark size={50} className="text-blue-900" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="text-[15px]">
                      <p>{isSaved ? "Хадгалагдсан" : "Хадгалах"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Building2 size={20} />
                <h3 className="text-xl font-semibold -mt-1.5">
                  Байгууллагын мэдээлэл
                </h3>
              </div>
              <p className="text-white leading-relaxed">
                {internship.organizationInfo?.trim()
                  ? internship.organizationInfo
                  : "Байгууллагын мэдээлэл оруулаагүй байна."}
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex gap-2">
                <ListChecks size={20} />
                <h3 className="text-xl font-semibold -mt-1.5">
                  Гүйцэтгэх үндсэн үүрэг
                </h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 opacity-90">
                {internship.jobInfo.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <ClipboardList size={20} />
                <h3 className="text-xl font-semibold -mt-1.5">
                  Ажлын байранд тавигдах шаардлага
                </h3>
              </div>
              <ul className="list-disc pl-5 space-y-1 opacity-90">
                {internship.requirements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {internship.addnationalInfo &&
              internship.addnationalInfo.length > 0 && (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Info size={20} />
                    <h3 className="text-xl font-semibold -mt-1.5">
                      Нэмэлт мэдээлэл
                    </h3>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 opacity-90">
                    {internship.addnationalInfo.length > 1 ? (
                      <ul className="list-disc pl-5 space-y-1 opacity-90">
                        {internship.addnationalInfo.map((info, i) => (
                          <li key={i}>{info}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="opacity-90">
                        Нэмэлт мэдээлэл байхгүй байна.
                      </p>
                    )}
                  </ul>
                </div>
              )}

            <div className="pt-2 text-sm opacity-80">
              <div className="flex gap-2">
                <CalendarDays size={18} />
                <div className="font-bold text-lg -mt-1.5">
                  {" "}
                  Дуусах хугацаа: {internship.deadline}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
