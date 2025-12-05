"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import LikertOption from "../_components/LikertOption";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useUser } from "@/providers/AuthProviders";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Question = {
  id: string;
  text: string;
  order: number;
  category: string;
};

const categories = [
  "Realistic",
  "Investigative",
  "Artistic",
  "Social",
  "Enterprising",
  "Conventional",
];

const QUESTIONS_PER_CATEGORY = 8;

const Page = () => {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [unansweredIds, setUnansweredIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { user } = useUser();
  const { push } = useRouter();
  const loggedUserId = user?.id;
  console.log(loggedUserId, "qwewqe");

  const ANSWER_COLORS = [
    "bg-red-400 border-red-500",
    "bg-orange-400 border-orange-500",
    "bg-gray-400 border-gray-500",
    "bg-green-400 border-green-500",
    "bg-teal-400 border-teal-500",
  ];

  const COLOR = [
    "bg-red-200 border-red-300",
    "bg-orange-200 border-orange-300",
    "bg-gray-200 border-gray-300",
    "bg-green-200 border-green-300",
    "bg-teal-200 border-teal-300",
  ];

  const ANSWER_LABELS = ["Огт үгүй", "Үгүй", "Магадгүй", "Тийм", "Яг тийм"];

  const handleSelect = (qid: string, ans: number) => {
    setAnswers({ ...answers, [qid]: ans });

    if (unansweredIds.includes(qid)) {
      setUnansweredIds(unansweredIds.filter((id) => id !== qid));
    }

    if (showAlert) {
      setShowAlert(false);
    }
  };

  const getQuestions = async () => {
    try {
      const res = await fetch("/api/questions", { cache: "no-store" });
      console.log("RES STATUS:", res.status);
      const data = await res.json();
      console.log("API DATA:", data);
      setAllQuestions(data);
    } catch (e) {
      console.error("FETCH ERROR:", e);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (!loggedUserId) return;

    const createSession = async () => {
      try {
        const res = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: loggedUserId }),
        });
        const data = await res.json();
        if (data.success) setSessionId(data.session.id);
      } catch (err) {
        console.error("Failed to create session:", err);
      }
    };

    createSession();
  }, [loggedUserId]);

  useEffect(() => {
    if (!allQuestions.length) return;

    const category = categories[currentCategoryIndex];
    const categoryQuestions = allQuestions.filter(
      (q) => q.category === category
    );

    if (!categoryQuestions.length) {
      setCurrentQuestions([]);
      return;
    }

    const start = Math.min(
      questionIndex,
      Math.max(categoryQuestions.length - QUESTIONS_PER_CATEGORY, 0)
    );
    const end = start + QUESTIONS_PER_CATEGORY;

    setCurrentQuestions(categoryQuestions.slice(start, end));
  }, [allQuestions, currentCategoryIndex, questionIndex]);

  const totalSteps = categories.length;
  const progress = ((currentCategoryIndex + 1) / totalSteps) * 100;

  const handleNext = async () => {
    const requiredIds = currentQuestions.map((q) => q.id);
    const unanswered = requiredIds.filter((id) => answers[id] === undefined);

    if (unanswered.length > 0) {
      setShowAlert(true);
      setUnansweredIds(unanswered);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const category = categories[currentCategoryIndex];
    const categoryQuestions = allQuestions
      .filter((q) => q.category === category)
      .sort((a, b) => a.order - b.order);

    const isLastQuestion =
      questionIndex + QUESTIONS_PER_CATEGORY >= categoryQuestions.length &&
      currentCategoryIndex + 1 >= categories.length;

    if (!isLastQuestion) {
      if (questionIndex + QUESTIONS_PER_CATEGORY < categoryQuestions.length) {
        setQuestionIndex(questionIndex + QUESTIONS_PER_CATEGORY);
      } else {
        setCurrentCategoryIndex(currentCategoryIndex + 1);
        setQuestionIndex(0);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsLoading(true);
    setOpen(true);

    try {
      await handleSubmit();
      await submitAll();
    } finally {
      setIsLoading(false);
    }
  };

  const submitAll = async () => {
    const payload = Object.entries(answers).map(([questionId, score]) => ({
      questionId,
      score,
    }));
    const res = await fetch("/api/aiSystem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: loggedUserId,
        answers: payload,
      }),
    });

    if (res.ok) {
      push("/test-result");
    } else {
      console.log(res);
    }
    const data = await res.json();
  };

  const handleBack = () => {
    if (questionIndex - QUESTIONS_PER_CATEGORY >= 0) {
      setQuestionIndex(questionIndex - QUESTIONS_PER_CATEGORY);
    } else if (currentCategoryIndex > 0) {
      const prevCategory = categories[currentCategoryIndex - 1];
      const prevCategoryQuestions = allQuestions.filter(
        (q) => q.category === prevCategory
      );

      setCurrentCategoryIndex(currentCategoryIndex - 1);
      setQuestionIndex(
        Math.max(prevCategoryQuestions.length - QUESTIONS_PER_CATEGORY, 0)
      );
    } else {
      alert("You are at the beginning!");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleSubmit = async () => {
    if (!sessionId) return;

    const payload = Object.entries(answers).map(([questionId, score]) => ({
      questionId,
      score,
      userId: loggedUserId,
      sessionId: sessionId,
    }));

    const res = await fetch("/api/answers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers: payload }),
    });

    const data = await res.json();
    console.log("Saved:", data);
  };

  return (
    <div className="w-full bg-[url('/raindow1.jpg')] bg-cover bg-center flex flex-col items-center px-6 py-10 bg-linear-to-b">
      <div className="w-full flex justify-start">
        <Button
          variant="secondary"
          className="cursor-pointer ml-60 -mb-25"
          onClick={() => push("/")}
        >
          Гарах
        </Button>
      </div>

      <div className="w-full max-w-2xl">
        <p className="text-right text-sm mb-1 text-white">
          step {currentCategoryIndex + 1} of {totalSteps}
        </p>
        <div className="w-full h-3 bg-white/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-300 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between gap-25 mt-3">
        {COLOR.map((col, index) => (
          <button
            key={index}
            className={`h-12 w-12 rounded-full flex items-center justify-center border transition-all  ${col}`}
          ></button>
        ))}
      </div>

      <div className="flex justify-between text-center mb-3 mt-3 gap-17">
        {ANSWER_LABELS.map((label) => (
          <div key={label} className="text-sm text-white w-20">
            {label}
          </div>
        ))}
      </div>

      <div className="mt-10 w-full max-w-2xl space-y-6">
        {currentQuestions.map((q) => (
          <div
            key={q.id}
            className={`bg-white/80 shadow-md rounded-xl p-5 backdrop-blur-sm   
      ${unansweredIds.includes(q.id) ? "border-2 border-red-500" : ""}
    `}
          >
            <p className="text-gray-800 text-lg mb-4">{q.text}</p>

            <div className="flex justify-between">
              {ANSWER_COLORS.map((col, index) => (
                <LikertOption
                  key={index}
                  value={index}
                  selected={answers[q.id]}
                  onSelect={() => handleSelect(q.id, index)}
                  color={col}
                  plainColor={COLOR[index]}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-120 mt-10">
        <button
          onClick={handleBack}
          className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-md transition-colors duration-200 hover:bg-slate-500"
        >
          <ArrowLeft />
        </button>

        <button
          onClick={handleNext}
          disabled={isLoading}
          className={`relative bg-white text-gray-800 px-6 py-3 rounded-full shadow-md transition-colors duration-200 
  ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
`}
        >
          {isLoading && (
            <div className="absolute -left-8 top-1/2 -translate-y-1/2">
              <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}

          <ArrowRight />
        </button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-xl text-center flex flex-col items-center py-8">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-4"></div>

          <DialogHeader>
            <DialogTitle className="text-2xl">
              Та 30 – 40 секунд түр хүлээнэ үү.
            </DialogTitle>
            <DialogDescription className="text-gray-900 text-2xl">
              AI анализ хийгдэж байна...
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-full max-w-2xl mt-4">
        {showAlert && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-full max-w-lg px-4">
            <Alert variant="destructive" className="shadow-lg">
              <AlertTitle className="flex items-center gap-2 text-2xl">
                <CircleAlert /> Анхаар!
              </AlertTitle>
              <AlertDescription>
                Танд хариулаагүй асуулт байна.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
