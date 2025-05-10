import { Link } from "react-router";

type InfoErrorProps = {
  error: Error;
};

export default function InfoError({ error }: InfoErrorProps) {
  let title = "Unknown Error";
  let message = "Something went wrong.";

  if (error instanceof Error) {
    title = "Application Error";
    message = error.message;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-red-500">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg">{message}</p>
      </div>
      <Link
        to={"/"}
        className="text-xl text-sky-400 hover:brightness-125 hover:underline font-bold cursor-pointer"
      >
        Return Home
      </Link>
    </div>
  );
}
