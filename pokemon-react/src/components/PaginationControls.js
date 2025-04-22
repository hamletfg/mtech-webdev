"use client";

import Link from "next/link";

export default function PaginationControls({
  currentPage,
  hasNextPage,
  hasPrevPage,
}) {
  return (
    <div className='flex justify-center items-center gap-4 mt-8'>
      {/* Previous Button */}
      <Link
        href={`/?page=${currentPage - 1}`}
        scroll={false} // Prevent scrolling to top on navigation className=
        className={`
                px-4 py-2 rounded border
                ${
                  !hasPrevPage
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none" // Disabled state
                    : "bg-blue-500 text-white hover:bg-blue-600" // Enabled state
                }
              `}
        aria-disabled={!hasPrevPage}
        tabIndex={!hasPrevPage ? -1 : undefined}
      >
        Previous
      </Link>

      {/* Current Page Indicator */}
      <span className='text-lg font-semibold'>Page {currentPage}</span>

      {/* Next Button */}
      <Link
        href={`/?page=${currentPage + 1}`}
        scroll={false} // Prevent scrolling to the top on navigation
        className={`
          px-4 py-2 rounded border
          ${
            !hasNextPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none" // Disabled state
              : "bg-blue-500 text-white hover:bg-blue-600" // Enabled state
          }
        `}
      >
        Next
      </Link>
    </div>
  );
}
