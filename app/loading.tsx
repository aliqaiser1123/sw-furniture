export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      <h2 className="text-xl font-semibold">Loading...</h2>
      <p className="text-muted-foreground">Please wait while we prepare this for you.</p>
    </div>
  );
}
