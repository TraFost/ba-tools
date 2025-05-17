import { Toaster } from "components/ui/sonner";

export const CommonProviders = () => {
  return (
    <Toaster
      position="top-center"
      className="font-bold text-secondary-foreground"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "font-bold text-[#33445c] bg-secondary border border-gray-200 shadow-md flex items-center gap-4 px-4 py-2 rounded-xl",
          description: "text-sm font-semibold",
        },
      }}
    />
  );
};
