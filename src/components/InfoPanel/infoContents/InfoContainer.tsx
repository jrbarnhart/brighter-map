export default function InfoContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-white flex flex-col gap-3">{children}</div>;
}
