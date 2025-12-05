// "use client";
// import dynamic from "next/dynamic";
// import { useEffect, useState, useRef } from "react";
// import { useUser } from "@/providers/AuthProviders";
// import Headers from "../_components/Header";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";

// import TopCareerCard from "../_components/TopCareerCard";
// import { TrendingUp } from "lucide-react";

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";

// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// import {
//   RadarChart,
//   Radar,
//   PolarGrid,
//   PolarAngleAxis,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardDescription,
// } from "@/components/ui/card";
// import { useRouter } from "next/navigation";
// import LineChartClient from "../_components/LineChartClient";

// interface RadarDataType {
//   category: string;
//   value: number;
// }

// interface InternshipType {
//   id: string;
//   title: string;
//   company: string;
//   organizationInfo: string;
//   jobInfo: string[];
//   requirements: string[];
//   addnationalInfo: string[];
//   salary: string;
//   imgUrl: string;
//   deadline: string;
// }

// interface AiResult {
//   description: string;
//   topCareers: TopCareersType[];
//   personalityType: string;
//   relatedCareers: string[];
//   recommendedSkills: string[];
//   summary: string;
//   radarData: RadarDataType[];
// }

// interface TopCareersType {
//   reason: string;
//   title: string;
//   careerAbout: string;
// }

// const Page = () => {
//   const { user } = useUser();
//   const userId = user?.id;
//   const { push } = useRouter();
//   const [radarData, setRadarData] = useState<RadarDataType[]>([]);
//   const [prevRadarData, setPrevRadarData] = useState<RadarDataType[]>([]);
//   const [savedIntern, setSavedIntern] = useState<any[]>([]);
//   const [loadingRadar, setLoadingRadar] = useState(true);
//   const [internship, setInternship] = useState<InternshipType | null>(null);
//   const [savedIds, setSavedIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [testResult, setTestResult] = useState<AiResult>();

//   const loggedUserId = user?.id;
//   console.log(loggedUserId);

//   const LineChartClient = dynamic(
//     () => import("../_components/LineChartClient"),
//     { ssr: false }
//   );

//   const CATEGORY_ORDER = [
//     "Realistic",
//     "Investigative",
//     "Artistic",
//     "Social",
//     "Conventional",
//     "Enterprising",
//   ];

//   // const normalizeRadarData = (data: RadarDataType[]) => {
//   //   const map = new Map<string, number>();
//   //   data.forEach((item) => {
//   //     map.set(item.category, item.value);
//   //   });

//   //   // CATEGORY_ORDER-д байгаа дарааллаар value-г авч array болгох
//   //   return CATEGORY_ORDER
//   //     .filter(cat => map.has(cat)) // зөвхөн байгаа category-г гаргах
//   //     .map(cat => ({ category: cat, value: map.get(cat)! }));
//   // };

//   const normalizeRadarData = (data: RadarDataType[]) => {
//     const map = new Map<string, number>();
//     data.forEach((item) => map.set(item.category, item.value));

//     // CATEGORY_ORDER-д байгаа дарааллаар value-г авч array болгох
//     return CATEGORY_ORDER.map((cat) => ({
//       category: cat,
//       value: map.get(cat) ?? 0, // байхгүй category-г 0 гэж үзнэ
//     }));
//   };

//   const prevRadarRef = useRef<RadarDataType[]>([]);

//   const fetchResult = async () => {
//     if (!userId) return;

//     try {
//       // Шинэ radarData авах
//       const res = await fetch(`/api/radarChart/${userId}`);
//       const newData: RadarDataType[] = await res.json();
//       setRadarData(normalizeRadarData(newData)); // normalize ашиглаж өгч байна

//       // Өмнөх тестийн өгөгдлийг авах
//       const prevRes = await fetch(`/api/radarChartPrev?userId=${userId}`);
//       const prevData: RadarDataType[] = await prevRes.json();
//       setPrevRadarData(normalizeRadarData(prevData)); // normalize ашиглаж өгч байна

//       // Шинэ тестийг хадгалах
//       await fetch("/api/radarChartResult", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, radarData: newData }),
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resultRes = async () => {
//     try {
//       const res = await fetch(`/api/aiResult?userId=${userId}`);
//       const resultData = await res.json();
//       setTestResult(resultData);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     if (loggedUserId) {
//       fetchResult();
//       resultRes();
//       savedInters();
//     }
//   }, [loggedUserId]);

//   const savedInters = async () => {
//     const res = await fetch(`api/savedIntern?userId=${userId}`);
//     if (!res) return;
//     const data = await res.json();
//     setSavedIntern(data);

//     console.log(res);
//   };

//   const fetchRadarData = async () => {
//     if (!userId) return;

//     try {
//       const response = await fetch(`/api/radarChart/${userId}`);
//       const data = await response.json();
//       setRadarData(data);
//     } catch (error) {
//       console.log("Error loading radar");
//     }
//   };

//   function initials(name?: string) {
//     if (!name) return "";
//     return name.slice(0, 2).toUpperCase();
//   }

//   useEffect(() => {
//     if (!userId) return;
//     savedInters();
//     fetchRadarData();
//   }, [userId]);

//   console.log(testResult, "qw");
//   return (
//     <div className="min-h-screen bg-[url('/tere3.jpg')] bg-cover bg-top m-0 p-0">
//       <Headers />
//       <div className="flex justify-between px-20 py-6">
//         <div className="p-6 bg-white/10 rounded-xl border border-white/20 w-[750px] h-[540px] mt-10  overflow-y-auto scrollbar-hide">
//           <div className="flex gap-5">
//             <Avatar className="h-20 w-20 border border-white/40">
//               <AvatarImage src={user?.imgUrl} />
//               <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
//                 {initials(user?.username)}
//               </AvatarFallback>
//             </Avatar>

//             <div className="mt-4 space-y-1">
//               <div className="text-xl font-semibold text-white bit-white-glow ">
//                 {user?.username}
//               </div>
//               <div className="text-white">{user?.email}</div>
//             </div>
//           </div>

//           <div className="text-white mt-1">
//             <strong>Ур чадварын Үнэлгээний Диаграмын тайлбар :</strong>
//             {testResult?.description}
//           </div>
//           <div className="text-white mt-1.5 ">
//             <strong>Зан чанарын төрөл :</strong>
//             {testResult?.personalityType}
//           </div>
//         </div>

//         <div className="p-6">
//           <Card className="mt-4 w-[600px] bg-white/10 backdrop-blur-md border-white/20 text-white pl-16">
//             <CardHeader>
//               <CardTitle className="text-white">
//                 Ур чадварын Үнэлгээний Диаграм
//               </CardTitle>
//             </CardHeader>

//             <CardContent className="-mt-8">
//               {loading || radarData.length === 0 ? (
//                 <p className="text-gray-300">Loading chart...</p>
//               ) : (
//                 <RadarChart
//                   cx={240}
//                   cy={240}
//                   outerRadius={140}
//                   width={480}
//                   height={440}
//                   data={radarData}
//                 >
//                   <PolarGrid stroke="#ffffff50" />
//                   <PolarAngleAxis dataKey="category" stroke="white" />

//                   <Radar
//                     name="Score"
//                     dataKey="value"
//                     stroke="#4f9eff"
//                     fill="#4f9eff"
//                     fillOpacity={0.6}
//                   />
//                 </RadarChart>
//               )}

//               <Button
//                 className="ative rounded-full h-9 px-7 text-[16px] font-extrabold text-white bg-indigo-500 border border-indigo-300 transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)] text-glow-hover hover:text-white hover:bg-blue-950"
//                 onClick={() => push("/testSession")}
//               >
//                 Тест дахин өгөх
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <div>
//         <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
//           Хадгалсан дадлагын ажлууд
//         </div>

//         {savedIntern.length === 0 && (
//           <div className="text-center text-white/80 text-2xl mt-4 font-light italic">
//             Та одоогоор дадлагын ажил хадгалаагүй байна.
//           </div>
//         )}

//         <Carousel className="w-full max-w-[1300px] mx-auto relative mt-3">
//           <CarouselContent className="-ml-4 m-5">
//             {savedIntern.map((item, index) => {
//               const intern = item.intern;
//               const id = String(intern.id);
//               const isSaved = savedIds.includes(id);

//               return (
//                 <CarouselItem
//                   key={index}
//                   className="pl-4 basis-full md:basis-1/2 lg:basis-1/4"
//                 >
//                   <div
//                     className="relative border border-gray-200 rounded-xl
//             px-10 py-3 h-[220px]
//             text-white cursor-pointer bg-linear-to-r
//             shadow-[0_0_15px_rgba(99,102,241,0.45)]
//             transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
//             hover:brightness-110 hover:-translate-y-0.5"
//                     onClick={() => push(`/internships/internship/${intern.id}`)}
//                   >
//                     <p className="font-bold text-white text-[20px]">
//                       {intern.title}
//                     </p>
//                     <p className="text-[18px] text-white">{intern.company}</p>
//                     <div className="text-[14px] text-white">
//                       {intern.organizationInfo}
//                     </div>
//                   </div>
//                 </CarouselItem>
//               );
//             })}
//           </CarouselContent>

//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>

//       <div>
//         <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
//           Таньд тохирсон кареерууд
//         </div>

//         <Carousel className="w-full max-w-[1300px] mx-auto relative mt-3">
//           <CarouselContent className="-ml-3 m-5">
//             {testResult?.topCareers.map((item: any, index: any) => {
//               return (
//                 <CarouselItem
//                   key={index}
//                   className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
//                 >
//                   <div
//                     className="relative border border-gray-200 rounded-xl
//   px-10 py-3 h-[420px]
//   text-white cursor-pointer bg-linear-to-r
//   shadow-[0_0_15px_rgba(99,102,241,0.45)]
//   transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
//   hover:brightness-110 hover:-translate-y-0.5"
//                   >
//                     <div className="h-full overflow-y-auto scrollbar-hide">
//                       <p className="font-bold text-white text-[20px]">
//                         {item.title}
//                       </p>

//                       <p className="text-[18px] text-white pt-2">
//                         <strong>Шалтгаан : </strong>
//                         {item.reason}
//                       </p>

//                       <TopCareerCard
//                         career={item}
//                         skills={testResult.recommendedSkills}
//                       />
//                     </div>
//                   </div>
//                 </CarouselItem>
//               );
//             })}
//           </CarouselContent>

//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//       <div className="flex flex-col px-20 mt-10">
//         <div className="text-2xl font-extrabold text-white mb-4 bit-white-glow">
//           Танд тохирох бусад карьерууд
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {testResult?.relatedCareers.map((career, index) => (
//             <div
//               key={index}
//               className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-default"
//             >
//               <p className="text-lg font-semibold">{career}</p>
//             </div>
//           ))}
//         </div>

//         <div className="mt-6 text-white text-base leading-relaxed bg-white/10 p-4 rounded-xl border border-white/20 shadow-inner">
//           {testResult?.summary}
//         </div>
//       </div>

//       <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
//         Өмнөх ба Одоогийн үр дүн
//       </div>
//       {prevRadarData.length === 0 && (
//         <div className="text-2xl mt-10 text-white/80 italic text-center pb-8">
//           Та дараагийн удаа тест өгөх үед өмнөх тестийн үр дүнг энд Line
//           Chart-аар харуулах болно.
//         </div>
//       )}

//       <div className="flex">
//         <div className="px-20 mt-10  pb-20">
//           <Card className="bg-white/10 border-white/20 backdrop-blur-md w-[600px]">
//             <CardHeader>
//               <CardTitle className="text-white bit-white-glow">
//                 Одоогийн Ур чадварын Диаграм (Line Chart)
//               </CardTitle>
//               <CardDescription className="text-white">
//                 Шинэ тестийн үр дүн
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <LineChartClient data={radarData} />
//             </CardContent>
//           </Card>
//         </div>

//         <div>
//           {prevRadarData.length > 0 && (
//             <div className="px-20 mt-10  pb-20">
//               <Card className="bg-white/10 border-white/20 backdrop-blur-md w-[600px]">
//                 <CardHeader>
//                   <CardTitle className="text-white bit-white-glow">
//                     Өмнөх Ур чадварын Диаграм (Line Chart)
//                   </CardTitle>
//                   <CardDescription className="text-white">
//                     Өмнөх тестийн үр дүн
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <LineChart
//                     width={480}
//                     height={300}
//                     data={prevRadarData}
//                     margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff30" />
//                     <XAxis dataKey="category" stroke="white" />
//                     <YAxis stroke="white" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#FFFFFF",
//                         border: "none",
//                       }}
//                     />
//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="#0000FF"
//                       strokeWidth={2}
//                     />
//                   </LineChart>
//                 </CardContent>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@/providers/AuthProviders";
import Headers from "../_components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import TopCareerCard from "../_components/TopCareerCard";

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import LineChartClient from "../_components/LineChartClient";

interface RadarDataType {
  category: string;
  value: number;
}

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

interface AiResult {
  description: string;
  topCareers: TopCareersType[];
  personalityType: string;
  relatedCareers: string[];
  recommendedSkills: string[];
  summary: string;
  radarData: RadarDataType[];
}

interface TopCareersType {
  reason: string;
  title: string;
  careerAbout: string;
}

const Page = () => {
  const { user } = useUser();
  const userId = user?.id;
  const { push } = useRouter();
  const [radarData, setRadarData] = useState<RadarDataType[]>([]);
  const [prevRadarData, setPrevRadarData] = useState<RadarDataType[]>([]);
  const [savedIntern, setSavedIntern] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<AiResult>();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  const loggedUserId = user?.id;

  const CATEGORY_ORDER = [
    "Realistic",
    "Investigative",
    "Artistic",
    "Social",
    "Conventional",
    "Enterprising",
  ];

  // normalize function
  const normalizeRadarData = (data: RadarDataType[]) => {
    const map = new Map<string, number>();
    data.forEach((item) => map.set(item.category, item.value));
    return CATEGORY_ORDER.map((cat) => ({
      category: cat,
      value: map.get(cat) ?? 0,
    }));
  };

  const fetchResult = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`/api/radarChart/${userId}`);
      const newData: RadarDataType[] = await res.json();
      setRadarData(normalizeRadarData(newData));

      const prevRes = await fetch(`/api/radarChartPrev?userId=${userId}`);
      const prevData: RadarDataType[] = await prevRes.json();
      setPrevRadarData(normalizeRadarData(prevData));

      await fetch("/api/radarChartResult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, radarData: newData }),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resultRes = async () => {
    try {
      const res = await fetch(`/api/aiResult?userId=${userId}`);
      const resultData = await res.json();
      setTestResult(resultData);
    } catch (err) {
      console.error(err);
    }
  };

  const savedInters = async () => {
    const res = await fetch(`api/savedIntern?userId=${userId}`);
    if (!res) return;
    const data = await res.json();
    setSavedIntern(data);
  };

  useEffect(() => {
    if (loggedUserId) {
      fetchResult();
      resultRes();
      savedInters();
    }
  }, [loggedUserId]);

  function initials(name?: string) {
    if (!name) return "";
    return name.slice(0, 2).toUpperCase();
  }

  return (
    <div className="min-h-screen bg-[url('/tere3.jpg')] bg-cover bg-top m-0 p-0">
      <Headers />

      {/* User Info */}
      <div className="flex justify-between px-20 py-6">
        <div className="p-6 bg-white/10 rounded-xl border border-white/20 w-[750px] h-[540px] mt-10  overflow-y-auto scrollbar-hide">
          <div className="flex gap-5">
            <Avatar className="h-20 w-20 border border-white/40">
              <AvatarImage src={user?.imgUrl} />
              <AvatarFallback className="text-2xl font-bold bg-white/20 text-white">
                {initials(user?.username)}
              </AvatarFallback>
            </Avatar>

            <div className="mt-4 space-y-1">
              <div className="text-xl font-semibold text-white bit-white-glow ">
                {user?.username}
              </div>
              <div className="text-white">{user?.email}</div>
            </div>
          </div>

          <div className="text-white mt-1">
            <strong>Ур чадварын Үнэлгээний Диаграмын тайлбар :</strong>
            {testResult?.description}
          </div>
          <div className="text-white mt-1.5 ">
            <strong>Зан чанарын төрөл :</strong>
            {testResult?.personalityType}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="p-6">
          <Card className="mt-4 w-[600px] bg-white/10 backdrop-blur-md border-white/20 text-white pl-16">
            <CardHeader>
              <CardTitle className="text-white">
                Ур чадварын Үнэлгээний Диаграм
              </CardTitle>
            </CardHeader>
            <CardContent className="-mt-8">
              {loading || radarData.length === 0 ? (
                <p className="text-gray-300">Loading chart...</p>
              ) : (
                <RadarChart
                  cx={240}
                  cy={240}
                  outerRadius={140}
                  width={480}
                  height={440}
                  data={radarData}
                >
                  <PolarGrid stroke="#ffffff50" />
                  <PolarAngleAxis dataKey="category" stroke="white" />
                  <Radar
                    name="Score"
                    dataKey="value"
                    stroke="#4f9eff"
                    fill="#4f9eff"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              )}

              <Button
                className="ative rounded-full h-9 px-7 text-[16px] font-extrabold text-white bg-indigo-500 border border-indigo-300 transition-all duration-300 cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.4)] text-glow-hover hover:text-white hover:bg-blue-950"
                onClick={() => push("/testSession")}
              >
                Тест дахин өгөх
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
          Хадгалсан дадлагын ажлууд
        </div>

        {savedIntern.length === 0 && (
          <div className="text-center text-white/80 text-2xl mt-4 font-light italic">
            Та одоогоор дадлагын ажил хадгалаагүй байна.
          </div>
        )}

        <Carousel className="w-full max-w-[1300px] mx-auto relative mt-3">
          <CarouselContent className="-ml-4 m-5">
            {savedIntern.map((item, index) => {
              const intern = item.intern;
              const id = String(intern.id);
              const isSaved = savedIds.includes(id);

              return (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/4"
                >
                  <div
                    className="relative border border-gray-200 rounded-xl
            px-10 py-3 h-[220px]
            text-white cursor-pointer bg-linear-to-r
            shadow-[0_0_15px_rgba(99,102,241,0.45)]
            transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
            hover:brightness-110 hover:-translate-y-0.5"
                    onClick={() => push(`/internships/internship/${intern.id}`)}
                  >
                    <p className="font-bold text-white text-[20px]">
                      {intern.title}
                    </p>
                    <p className="text-[18px] text-white">{intern.company}</p>
                    <div className="text-[14px] text-white">
                      {intern.organizationInfo}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div>
        <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
          Таньд тохирсон кареерууд
        </div>

        <Carousel className="w-full max-w-[1300px] mx-auto relative mt-3">
          <CarouselContent className="-ml-3 m-5">
            {testResult?.topCareers.map((item: any, index: any) => {
              return (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className="relative border border-gray-200 rounded-xl
  px-10 py-3 h-[420px]
  text-white cursor-pointer bg-linear-to-r
  shadow-[0_0_15px_rgba(99,102,241,0.45)]
  transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.9)]
  hover:brightness-110 hover:-translate-y-0.5"
                  >
                    <div className="h-full overflow-y-auto scrollbar-hide">
                      <p className="font-bold text-white text-[20px]">
                        {item.title}
                      </p>

                      <p className="text-[18px] text-white pt-2">
                        <strong>Шалтгаан : </strong>
                        {item.reason}
                      </p>

                      <TopCareerCard
                        career={item}
                        skills={testResult.recommendedSkills}
                      />
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col px-20 mt-10">
        <div className="text-2xl font-extrabold text-white mb-4 bit-white-glow">
          Танд тохирох бусад карьерууд
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testResult?.relatedCareers.map((career, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-[0_0_10px_rgba(255,255,255,0.15)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-300 cursor-default"
            >
              <p className="text-lg font-semibold">{career}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-white text-base leading-relaxed bg-white/10 p-4 rounded-xl border border-white/20 shadow-inner">
          {testResult?.summary}
        </div>
      </div>
      <div className="text-2xl pl-10 mt-5 -mb-2 glow-hover font-extrabold transition-all duration-200 text-white bit-white-glow ml-10">
        Өмнөх ба Одоогийн үр дүн {" "}
      </div>

      {/* Line Charts */}
      <div className="flex px-20 mt-10 pb-20">
        <div className="mr-10">
          <Card className="bg-white/10 border-white/20 backdrop-blur-md w-[600px]">
            <CardHeader>
              <CardTitle className="text-white bit-white-glow">
                Одоогийн Ур чадварын Диаграм
              </CardTitle>
              <CardDescription className="text-white">
                Шинэ тестийн үр дүн
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChartClient data={radarData} />
            </CardContent>
          </Card>
        </div>

        {prevRadarData.length > 0 && (
          <div>
            <Card className="bg-white/10 border-white/20 backdrop-blur-md w-[600px]">
              <CardHeader>
                <CardTitle className="text-white bit-white-glow">
                  Өмнөх Ур чадварын Диаграм
                </CardTitle>
                <CardDescription className="text-white">
                  Өмнөх тестийн үр дүн
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LineChartClient data={prevRadarData} />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
