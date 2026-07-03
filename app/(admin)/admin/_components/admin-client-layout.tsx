"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar-content";

const sidebarScrollbarClass =
  "scrollbar-thin [scrollbar-color:rgba(255,255,255,0.22)_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/35";

export function AdminClientLayout({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Desktop sidebar */}
      <aside className="hidden h-screen w-60 shrink-0 overflow-hidden bg-[#06122a] lg:flex lg:flex-col">
        <div
          className={`h-full overflow-y-auto overflow-x-hidden pr-1 ${sidebarScrollbarClass}`}
        >
          <SidebarContent email={email} />
        </div>
      </aside>

      {/* Main area */}
      <div className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <header className="z-30 flex h-14 shrink-0 items-center border-b bg-white px-4 lg:hidden">
          <button
            onClick={() => setOpen(true)}
            className="mr-3 rounded p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Open navigation"
          >
            <Menu className="size-5" />
          </button>

          <span className="text-sm font-bold tracking-wide text-slate-800">
            LEXA <span className="text-brand">CMS</span>
          </span>
        </header>

            <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-5 lg:px-6 lg:py-7">
                <div className="mx-auto w-full max-w-[1080px]">
                    {children}
            </div>
        </main>
      </div>

      {/* Mobile drawer */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="h-screen w-60 overflow-hidden border-0 bg-[#06122a] p-0"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>

          <div
            className={`h-full overflow-y-auto overflow-x-hidden pr-1 ${sidebarScrollbarClass}`}
          >
            <SidebarContent email={email} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}