import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
      <FileQuestion className="w-16 h-16 text-muted-foreground mb-4" />
      <h2 className="text-3xl font-bold tracking-tight">Page Not Found</h2>
      <p className="text-muted-foreground max-w-[500px]">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="mt-6">
        <Button asChild size="lg">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
