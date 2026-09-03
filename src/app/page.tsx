import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold tracking-tight">hello there</h1>
      <Button>Click me</Button>
    </div>
  );
}
