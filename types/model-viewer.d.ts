// Type declarations for @google/model-viewer web component
declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        "shadow-intensity"?: string;
        "camera-controls"?: boolean | "";
        "auto-rotate"?: boolean | "";
        "auto-rotate-delay"?: string;
        "rotation-per-second"?: string;
        "environment-image"?: string;
        exposure?: string;
        ar?: boolean | "";
        "ar-modes"?: string;
        "ar-scale"?: string;
        loading?: "auto" | "lazy" | "eager";
        reveal?: "auto" | "manual";
        style?: React.CSSProperties;
        className?: string;
        id?: string;
      },
      HTMLElement
    >;
  }
}
