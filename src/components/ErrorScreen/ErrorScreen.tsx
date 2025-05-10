import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorScreen() {
  const error = useRouteError();

  let title = "Unknown Error";
  let message = "Something went wrong.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status.toString()}`;
    message = error.statusText;
  } else if (error instanceof Error) {
    title = "Application Error";
    message = error.message;
  }

  return (
    <div className="grid content-center justify-center h-svh w-svw bg-stone-800 text-stone-50">
      <div className="flex flex-col items-center justify-center gap-10 p-10 bg-stone-700 border border-amber-300 rounded-2xl">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
}
