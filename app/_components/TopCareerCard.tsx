import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";

export default function TopCareerCard({
  career,
  skills,
}: {
  career: any;
  skills: any;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 flex items-center gap-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50"
        >
          Дэлгэрэнгүй харах <ChevronRight size={16} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[500px] sm:w-[600px] lg:w-[700px] p-6 overflow-y-auto scroll-pr-0.5"
      >
        <SheetHeader>
          <SheetTitle className="text-2xl -mt-6">
            <strong>{career.title}</strong>
          </SheetTitle>
          <SheetDescription className="text-gray-900 text-[18px]">
            {career.careerAbout || "This career involves…"}
          </SheetDescription>
        </SheetHeader>

        <SheetTitle className="pl-5 -mt-7">
          <strong className="text-2xl">Танд санал болгосон шалтгаан :</strong>{" "}
        </SheetTitle>
        <SheetDescription className="text-gray-900 text-[18px] pl-5 -mt-3">
          {" "}
          {career.reason}
        </SheetDescription>
        <div className="space-y-3 -mt-2 font-bold">
          <p>
            <strong className="text-2xl pl-5 -pt-5">Ур чадварууд:</strong>
          </p>
          <div className="pl-5 -mt-2">
            {" "}
            {skills?.map((skill: any, idx: number) => (
              <div key={idx}>{skill}</div>
            )) || <div>N/A</div>}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
