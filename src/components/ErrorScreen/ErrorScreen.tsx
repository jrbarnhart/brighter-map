import { isRouteErrorResponse, Link, useRouteError } from "react-router";

type ErrorScreenProps = {
  error?: Error;
};

export default function ErrorScreen({ error }: ErrorScreenProps) {
  const routeError = useRouteError();

  let title = "Unknown Error";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(routeError)) {
    title = `Error ${routeError.status.toString()}`;
    message = routeError.statusText;
  } else if (routeError instanceof Error) {
    title = "Application Error";
    message = routeError.message;
  } else if (error) {
    title = "Application Error";
    message = error.message;
  }

  return (
    <div className="grid content-center justify-center h-svh w-svw bg-stone-800 text-stone-50">
      <div className="flex flex-col items-center justify-center gap-10 p-10 bg-stone-700 border border-red-400 rounded-2xl">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{message}</p>
        <Link
          to={"/"}
          className="text-xl text-sky-400 hover:brightness-125 hover:underline font-bold cursor-pointer"
          reloadDocument={true}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
