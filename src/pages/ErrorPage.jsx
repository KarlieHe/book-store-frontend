
const ErrorPage = () => {
  return (
        <div className="flex flex-col min-h-screen items-center pt-60">
            <h1 className="mt-4 text-7xl font-semibold tracking-tight text-balance text-gray-900">
                Oops!
            </h1>
            
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                Page not found
            </h1>
            <p className="mt-8 text-base font-semibold text-indigo-600">404</p>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                href="/"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Go back home
                </a>
                {/* <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
                </a> */}
            </div>
        </div>
  )
}

export default ErrorPage