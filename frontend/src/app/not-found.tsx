import Link from "next/link";

export default function NotFoundRoot() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
      <div className="flex flex-col space-y-4 items-center justify-center">
        <MagnifyingGlassIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Oops!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Page not found.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          Go back
        </Link>
      </div>
    </div>
  );
}

function MagnifyingGlassIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <g transform="scale(1)">
        <g>
          <path d="M359.568,327.246L191.511,21.818c-2.197-3.993-6.395-6.474-10.952-6.474c-4.558,0-8.754,2.481-10.952,6.474L1.549,327.246
			c-2.131,3.872-2.058,8.582,0.191,12.388c2.249,3.805,6.34,6.139,10.76,6.139h336.117c4.421,0,8.512-2.334,10.761-6.139
			C361.627,335.828,361.699,331.118,359.568,327.246z M33.646,320.772L180.559,53.773l146.913,266.999H33.646z"/>
          <path d="M164.894,143.085v90.351c0,8.65,7.014,15.665,15.665,15.665c8.65,0,15.665-7.015,15.665-15.665v-90.351
			c0-8.651-7.015-15.665-15.665-15.665C171.908,127.42,164.894,134.435,164.894,143.085z"/>
          <path d="M180.559,265.364c-9.097,0-16.5,7.399-16.5,16.5c0,9.098,7.403,16.5,16.5,16.5c9.097,0,16.5-7.402,16.5-16.5
			C197.059,272.764,189.655,265.364,180.559,265.364z"/>
        </g>
      </g>
    </svg>
  );
}

