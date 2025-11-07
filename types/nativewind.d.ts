import "react-native";

declare module "react-native" {
  // Add common `className` support used by nativewind/cssInterop in this repo.
  interface ViewProps {
    className?: string;
  }

  interface TextProps {
    className?: string;
  }

  interface TextInputProps {
    className?: string;
    placeholderClassName?: string;
  }

  interface ImageProps {
    className?: string;
  }

  interface PressableProps {
    className?: string;
  }
}

// Lucide icons also receive `className` via cssInterop
declare module "lucide-react-native" {
  interface LucideProps {
    className?: string;
  }
}
