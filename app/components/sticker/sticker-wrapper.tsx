"use client";

import { useEffect, useState } from "react";

import Canvas from "components/sticker/canvas";
import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "components/ui/radio-group";
import { Slider } from "components/ui/slider";
import { Textarea } from "components/ui/textarea";

import { stickers } from "app/data/dataDummy";

interface Position {
  x: number;
  y: number;
}

const StickerWrapper = () => {
  const [text, setText] = useState<string>("Nn~");
  const [name, setName] = useState<string>(stickers[0].name);
  const [color, setColor] = useState<string>("#000000");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [fontSize, setFontSize] = useState<number>(64);
  const [position, setPosition] = useState<Position>({ x: 256, y: 128 });
  const [lineH, setLineH] = useState<number>(60);
  const [stroke, setStroke] = useState<number>(10);
  const [strokeColor, setStrokeColor] = useState<string>("#ffffff");
  const [rotate, setRotate] = useState<number>(-15);
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    handleSetImage(stickers[0]);
  }, []);

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!img) return;

    ctx.canvas.width = 512;
    ctx.canvas.height = 512;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.drawImage(img, 0, 0, 512, 512);
    ctx.font = `${fontSize}px Balsamiq Sans`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = text.split(orientation === "horizontal" ? "\n" : "");
    const textHeight = lines.length * lineH;

    ctx.save();
    ctx.translate(position.x, position.y + textHeight / 2);
    ctx.rotate((rotate * Math.PI) / 180);

    lines.forEach((line, index) => {
      const yPos = (index - lines.length / 2) * lineH;

      ctx.lineWidth = stroke;
      ctx.strokeStyle = strokeColor;
      ctx.strokeText(line, 0, yPos);

      ctx.fillStyle = color;
      ctx.fillText(line, 0, yPos);
    });

    ctx.restore();
  };

  const handleSetImage = ({ name, image }: { name?: string; image?: string }) => {
    const img = new Image();
    setName(name);
    img.src = image;
    img.onload = () => setImg(img);
  };

  const download = (name: string) => {
    const canvas = document.querySelector("canvas");
    const link = document.createElement("a");
    link.download = name;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 mx-auto px-4 pt-8 pb-16">
      <Dialog>
        <DialogTrigger className="cursor-pointer -skew-x-12 h-10 px-6 has-[>svg]:px-4 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive">
          <span className="skew-x-12 text-lg font-semibold">Select Sticker</span>
        </DialogTrigger>
        <DialogContent className="lg:max-w-1/2">
          <DialogHeader>
            <DialogTitle>Select Sticker</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 h-[512px] overflow-y-auto px-4 py-2">
            {stickers.map((sticker) => (
              <DialogClose
                key={sticker.name}
                className="aspect-square rounded-xl hover:outline-4 outline-offset-4 outline-primary-foreground cursor-pointer"
                onClick={() => handleSetImage(sticker)}
              >
                <img src={sticker.image} alt={sticker.name} className="object-cover" />
              </DialogClose>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <div className="flex flex-col gap-6 mt-8">
        <div className="flex gap-2 items-center h-[350px] min-[426px]:h-[400px] min-[560px]:h-[512px]">
          <Slider
            step={1}
            max={512}
            onValueChange={(val) => setPosition((prev) => ({ ...prev, y: val[0] }))}
            value={[position.y]}
            orientation="vertical"
            className="data-[orientation=vertical]:h-full"
            inverted
          />
          <Canvas draw={draw} />
        </div>
        <div>
          <Slider
            step={1}
            max={512}
            onValueChange={(val) => setPosition((prev) => ({ ...prev, x: val[0] }))}
            value={[position.x]}
          />
          <label htmlFor="rotate">
            Rotate: {rotate}&deg;
            <Slider
              id="rotate"
              step={1}
              min={-180}
              max={180}
              onValueChange={(val) => setRotate(val[0])}
              value={[rotate]}
            />
          </label>
        </div>
      </div>
      <div className="w-full max-w-[512px] flex flex-col gap-2">
        <div>
          <label htmlFor="content">
            Text
            <Textarea
              name="content"
              id="content"
              className="w-full min-h-[24px] resize-none overflow-hidden"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
        </div>
        <div className="flex items-center">
          <label htmlFor="color">Text Color: </label>
          <input
            type="color"
            name="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <RadioGroup
          className="flex gap-4"
          defaultValue="horizontal"
          onValueChange={(val) => setOrientation(val as "horizontal" | "vertical")}
        >
          <p>Text Orientation: </p>
          <div className="flex items-center gap-1">
            <RadioGroupItem value="horizontal" id="horizontal" />
            <label htmlFor="horizontal"> Horizontal</label>
          </div>
          <div className="flex items-center gap-1">
            <RadioGroupItem value="vertical" id="vertical" />
            <label htmlFor="vertical"> Vertical</label>
          </div>
        </RadioGroup>
        <div>
          <label htmlFor="font-size">
            Font Size: {fontSize}px
            <Slider
              id="font-size"
              step={1}
              min={2}
              max={128}
              onValueChange={(val) => setFontSize(val[0])}
              value={[fontSize]}
            />
          </label>
        </div>
        <div>
          <label htmlFor="line-height">
            Line Height: {lineH}
            <Slider
              id="line-height"
              step={1}
              min={1}
              max={100}
              onValueChange={(val) => setLineH(val[0])}
              value={[lineH]}
            />
          </label>
        </div>
        <div>
          <label htmlFor="outline">
            Outline: {stroke}
            <Slider
              id="outline"
              step={1}
              min={1}
              max={50}
              onValueChange={(val) => setStroke(val[0])}
              value={[stroke]}
            />
          </label>
        </div>
        <div className="flex items-center">
          <label htmlFor="stroke-color">Outline Color: </label>
          <input
            type="color"
            name="stroke-color"
            id="stroke-color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
        </div>
      </div>
      <Button className="-skew-x-12 mt-6" size="xl" onClick={() => download(name)}>
        <span className="skew-x-12 text-xl font-semibold">Download</span>
      </Button>
    </div>
  );
};

export default StickerWrapper;
