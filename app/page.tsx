import BigCard from "components/ui/big-card";

interface IFeatures {
  url: string;
  bgPath: string;
  title: string;
}

const mainFeatures: IFeatures[] = [
  { url: "#", bgPath: "/BG.jpg", title: "Dialog Maker" },
  {
    url: "#",
    bgPath: "/BG_HyakkiyakoSquareStreet.jpg",
    title: "Momotalk generator",
  },
  { url: "#", bgPath: "/BG_SchaleOperationRoom.jpg", title: "Music Archive" },
];

export default function Page() {
  return (
    <div className="size-full flex flex-col gap-8 sm:gap-24 px-8 max-sm:pt-12 sm:items-center sm:justify-center">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-bold text-secondary-foreground">Blue Archive Tools</p>
        <p className="text-lg text-center font-semibold text-accent-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis quod placeat possimus
          dolorum nesciunt ab esse eveniet at!
        </p>
      </div>
      <div className="flex flex-wrap h-fit gap-x-8 gap-y-4 sm:gap-12 justify-center">
        {mainFeatures.map((feature) => (
          <BigCard key={feature.title} bgUrl={feature.bgPath} href={feature.url}>
            {feature.title}
          </BigCard>
        ))}
      </div>
    </div>
  );
}
