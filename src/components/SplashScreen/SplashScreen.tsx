export default function SplashScreen() {
  return (
    <div className="grid content-center justify-center h-svh w-svw bg-stone-800 text-stone-50">
      <div className="flex flex-col items-center justify-center gap-10 p-10 bg-stone-700 border border-amber-300 rounded-2xl">
        <h1 className="text-2xl font-bold">Welcome to Brighter Map</h1>
        <p className="italic">Loading map data...</p>
      </div>
    </div>
  );
}
