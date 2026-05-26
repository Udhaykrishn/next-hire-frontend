"use client";

import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination as ShadcnPagination,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { JSX } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function PageItems({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const items: JSX.Element[] = [];
  const showEllipsis = totalPages > 7;

  if (!showEllipsis) {
    Array.from({ length: totalPages }, (_, index) => {
      const i = index + 1;
      items.push(
        <PaginationItem key={`page-${i}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(i);
            }}
            isActive={i === currentPage}
            className={cn(
              "size-10 rounded-xl text-sm font-black transition-all duration-200 border-none",
              i === currentPage
                ? "bg-wise-green text-dark-green shadow-lg shadow-wise-green/20 hover:bg-wise-green/90"
                : "text-gray-400 hover:text-near-black hover:bg-gray-50",
            )}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    });
  } else {
    const addPage = (p: number) => {
      items.push(
        <PaginationItem key={`page-${p}`}>
          <PaginationLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onPageChange(p);
            }}
            isActive={p === currentPage}
            className={cn(
              "size-10 rounded-xl text-sm font-black transition-all duration-200 border-none",
              p === currentPage
                ? "bg-wise-green text-dark-green shadow-lg shadow-wise-green/20 hover:bg-wise-green/90"
                : "text-gray-400 hover:text-near-black hover:bg-gray-50",
            )}
          >
            {p}
          </PaginationLink>
        </PaginationItem>,
      );
    };

    const addEllipsis = (key: string) => {
      items.push(
        <PaginationItem key={key}>
          <PaginationEllipsis className="text-gray-400" />
        </PaginationItem>,
      );
    };

    if (currentPage <= 4) {
      Array.from({ length: 5 }, (_, idx) => addPage(idx + 1));
      addEllipsis("ellipsis-1");
      addPage(totalPages);
    } else if (currentPage >= totalPages - 3) {
      addPage(1);
      addEllipsis("ellipsis-2");
      Array.from({ length: 5 }, (_, idx) => addPage(totalPages - 4 + idx));
    } else {
      addPage(1);
      addEllipsis("ellipsis-3");
      Array.from({ length: 3 }, (_, idx) => addPage(currentPage - 1 + idx));
      addEllipsis("ellipsis-4");
      addPage(totalPages);
    }
  }

  return <>{items}</>;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-white",
        className,
      )}
    >
      <div className="hidden sm:flex items-center gap-1.5">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Page <span className="text-near-black">{currentPage}</span> of{" "}
          {totalPages}
        </p>
      </div>

      <ShadcnPagination className="w-auto mx-0">
        <PaginationContent className="gap-2">
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={cn(
                "h-10 rounded-xl border border-gray-100 px-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-near-black hover:border-gray-200 transition-all",
                currentPage === 1 && "opacity-30 pointer-events-none",
              )}
            />
          </PaginationItem>

          <PageItems
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={cn(
                "h-10 rounded-xl border border-gray-100 px-4 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-near-black hover:border-gray-200 transition-all",
                currentPage === totalPages && "opacity-30 pointer-events-none",
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
    </div>
  );
}
