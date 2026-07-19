import { Metadata } from "next";
import { RoomDesignerUI } from "./RoomDesignerUI";

export const metadata: Metadata = {
  title: "AI Room Designer | Shesham Wood Furniture",
  description: "Visualize Sheesham wood furniture in your own space using our AI Room Designer.",
};

export default function RoomDesignerPage() {
  return (
    <div className="container-default py-12 lg:py-24 space-y-12 min-h-screen">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading tracking-tight">AI Room Designer</h1>
        <p className="text-lg text-muted-foreground">
          Upload a photo of your room, tell us your style preferences, and watch as our AI
          reimagines your space with handcrafted Sheesham wood furniture.
        </p>
      </div>

      <RoomDesignerUI />
    </div>
  );
}
