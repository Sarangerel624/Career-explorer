import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Headers() {
  const { push } = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/40 border-b border-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
      <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center hover:text-white">
        <div className="flex gap-4 items-center text-white">
          <img src="/logoo.png" className="logo" />

          <style jsx>{`
            .logo {
              width: 40px !important;
              height: 40px !important;
              object-fit: contain;
              display: block;
            }
          `}</style>

          <p className="font-bold text-[22px] text-white text-glow-white ">
            IREEDUIN KHUTUCH
          </p>
        </div>

        <div className="flex gap-8 items-center text-[16px] font-medium text-white drop-shadow ">
          <div
            className="text-glow-blue text-glow-hover text-white transition-all duration-300 cursor-pointer"
            onClick={() => push("/")}
          >
            Нүүр хуудас
          </div>
          <div
            className="text-glow-blue text-glow-hover text-white transition-all duration-300 cursor-pointer"
            onClick={() => push("/testSession")}
          >
            Тест өгөх
          </div>
          <div
            className="text-glow-blue text-glow-hover text-white transition-all duration-300 cursor-pointer"
            onClick={() => push("/internships")}
          >
            Дадлагын ажил
          </div>
          <div
            className="text-glow-blue text-glow-hover text-white transition-all duration-300 cursor-pointer"
            onClick={() => push("/test-result")}
          >
            Тестийн хариу харах
          </div>
          <div
            className="hover:text-indigo-300 transition text-glow-blue text-glow-hover text-white duration-300 cursor-pointer"
            onClick={() => push("/profile")}
          >
            Профайл
          </div>

          <div
            className="text-glow-blue text-glow-hover text-white transition-all duration-300 cursor-pointer"
            onClick={logout}
          >
            Гарах
          </div>

          {/* <Button className="rounded-full px-5 bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-400/40"></Button> */}
        </div>
      </div>
    </header>
  );
}
