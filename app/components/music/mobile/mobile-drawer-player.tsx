import Image from "next/image";

const MobilePlayer = () => {
  return (
    <div className="flex flex-col gap-4 mx-8">
      <Image
        src={"/Akane_(Bunny_Girl).png"}
        alt="cover"
        width={256}
        height={256}
        className="aspect-square object-cover rounded-xl mx-auto"
        draggable={false}
      />
      <div>
        <p className="text-2xl font-bold">Usagi Flap</p>
        <p className="text-xl font-semibold text-accent-foreground">Mitsukiyo</p>
      </div>
      <div>Controller here</div>
    </div>
  );
};

export default MobilePlayer;
