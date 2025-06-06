"use client";

import {
  type ChangeEvent,
  type KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Canvas from "components/sticker/canvas";
import { Button } from "components/ui/button";
import { Checkbox } from "components/ui/checkbox";
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
import {
  Download,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Layers,
  Maximize,
  MoveHorizontal,
  MoveVertical,
  Palette,
  Redo2,
  RotateCcw,
  Text,
  Type,
  Undo2,
} from "lucide-react";

import { stickers } from "app/data/dataDummy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "components/ui/tooltip";

interface Position {
  x: number;
  y: number;
}

interface StickerState {
  text: string;
  name: string;
  color: string;
  orientation: "horizontal" | "vertical";
  fontSize: number;
  position: Position;
  lineH: number;
  stroke: number;
  strokeColor: string;
  rotate: number;
  bgColor: string;
  transparent: boolean;
  isTextBehind: boolean;
}

interface StickerImage {
  name: string;
  image: string;
}

const StickerWrapper = () => {
  const [text, setText] = useState<string>("Nn~\n     Nn.");
  const [name, setName] = useState<string>(stickers[0].name);
  const [color, setColor] = useState<string>("#ffffff");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [fontSize, setFontSize] = useState<number>(64);
  const [position, setPosition] = useState<Position>({ x: 256, y: 128 });
  const [lineH, setLineH] = useState<number>(64);
  const [stroke, setStroke] = useState<number>(10);
  const [strokeColor, setStrokeColor] = useState<string>("#000000");
  const [rotate, setRotate] = useState<number>(-15);
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [bgColor, setBgColor] = useState<string>("#000000");
  const [transparent, setTransparent] = useState<boolean>(true);
  const [isTextBehind, setIsTextBehind] = useState<boolean>(false);

  const [history, setHistory] = useState<StickerState[]>([]);
  const [currentStateIndex, setCurrentStateIndex] = useState<number>(-1);
  const [activeTab, setActiveTab] = useState<string>("text");

  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleSetImage(stickers[0] as StickerImage);

    const initialState: StickerState = {
      text: "Nn~\n     Nn.",
      name: stickers[0].name,
      color: "#ffffff",
      orientation: "horizontal",
      fontSize: 64,
      position: { x: 256, y: 128 },
      lineH: 64,
      stroke: 10,
      strokeColor: "#000000",
      rotate: -15,
      bgColor: "#000000",
      transparent: true,
      isTextBehind: false,
    };

    setHistory([initialState]);
    setCurrentStateIndex(0);
  }, []);

  useEffect(() => {
    const handleSaveSticker = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        download(name);
      }
    };

    window.addEventListener("keydown", handleSaveSticker);

    return () => {
      window.removeEventListener("keydown", handleSaveSticker);
    };
  }, [name]);

  const saveToHistory = useCallback(
    (updatedState = {}) => {
      const currentState = {
        text,
        name,
        color,
        orientation,
        fontSize,
        position,
        lineH,
        stroke,
        strokeColor,
        rotate,
        bgColor,
        transparent,
        isTextBehind,
        ...updatedState,
      };

      setHistory((prev) => {
        const newHistory = prev.slice(0, currentStateIndex + 1);
        newHistory.push(currentState);
        return newHistory;
      });

      setCurrentStateIndex((prev) => prev + 1);
    },
    [
      text,
      name,
      color,
      orientation,
      fontSize,
      position,
      lineH,
      stroke,
      strokeColor,
      rotate,
      bgColor,
      transparent,
      isTextBehind,
      currentStateIndex,
    ],
  );

  const handleUndo = useCallback(() => {
    if (currentStateIndex > 0) {
      const prevState = history[currentStateIndex - 1];

      setText(prevState.text);
      setName(prevState.name);
      setColor(prevState.color);
      setOrientation(prevState.orientation);
      setFontSize(prevState.fontSize);
      setPosition(prevState.position);
      setLineH(prevState.lineH);
      setStroke(prevState.stroke);
      setStrokeColor(prevState.strokeColor);
      setRotate(prevState.rotate);
      setBgColor(prevState.bgColor);
      setTransparent(prevState.transparent);
      setIsTextBehind(prevState.isTextBehind);

      if (prevState.name !== name) {
        const sticker = stickers.find((s) => s.name === prevState.name);
        if (sticker) {
          const img = new Image();
          img.src = sticker.image;
          img.onload = () => setImg(img);
        }
      }

      setCurrentStateIndex(currentStateIndex - 1);
    }
  }, [currentStateIndex, history, name]);

  const handleRedo = useCallback(() => {
    if (currentStateIndex < history.length - 1) {
      const nextState = history[currentStateIndex + 1];

      setText(nextState.text);
      setName(nextState.name);
      setColor(nextState.color);
      setOrientation(nextState.orientation);
      setFontSize(nextState.fontSize);
      setPosition(nextState.position);
      setLineH(nextState.lineH);
      setStroke(nextState.stroke);
      setStrokeColor(nextState.strokeColor);
      setRotate(nextState.rotate);
      setBgColor(nextState.bgColor);
      setTransparent(nextState.transparent);
      setIsTextBehind(nextState.isTextBehind);

      if (nextState.name !== name) {
        const sticker = stickers.find((s) => s.name === nextState.name);
        if (sticker) {
          const img = new Image();
          img.src = sticker.image;
          img.onload = () => setImg(img);
        }
      }

      setCurrentStateIndex(currentStateIndex + 1);
    }
  }, [currentStateIndex, history, name]);

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    const newText = e.target.value;
    setText(newText);
    saveToHistory({ text: newText });
  };

  const handleTextKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const textStart = text.substring(0, cursorPosition);
      const textEnd = text.substring(cursorPosition);
      const newText = `${textStart}\n${textEnd}`;
      setText(newText);

      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.selectionStart = cursorPosition + 1;
          e.currentTarget.selectionEnd = cursorPosition + 1;
        }
        saveToHistory({ text: newText });
      }, 0);
    }
  };

  const handleSetImage = ({ name, image }: StickerImage): void => {
    const img = new Image();
    setName(name);
    img.src = image;
    img.onload = () => {
      setImg(img);
      saveToHistory({ name });
      setActiveTab("position");
    };
  };

  const handlePositionX = (val: number[]): void => {
    const newX = val[0];
    setPosition((prev) => ({ ...prev, x: newX }));
    saveToHistory({ position: { x: newX, y: position.y } });
  };

  const handlePositionY = (val: number[]): void => {
    const newY = val[0];
    setPosition((prev) => ({ ...prev, y: newY }));
    saveToHistory({ position: { x: position.x, y: newY } });
  };

  const handleRotate = (val: number[]): void => {
    const newRotate = val[0];
    setRotate(newRotate);
    saveToHistory({ rotate: newRotate });
  };

  const handleTransparent = (): void => {
    const newTransparent = !transparent;
    setTransparent(newTransparent);
    saveToHistory({ transparent: newTransparent });
  };

  const handleBgColor = (e: ChangeEvent<HTMLInputElement>): void => {
    const newBgColor = e.target.value;
    setBgColor(newBgColor);
    saveToHistory({ bgColor: newBgColor });
  };

  const handleTextBehind = (): void => {
    const newIsTextBehind = !isTextBehind;
    setIsTextBehind(newIsTextBehind);
    saveToHistory({ isTextBehind: newIsTextBehind });
  };

  const handleOrientation = (val: string): void => {
    const newOrientation = val as "horizontal" | "vertical";
    setOrientation(newOrientation);
    saveToHistory({ orientation: newOrientation });
  };

  const handleTextColor = (e: ChangeEvent<HTMLInputElement>): void => {
    const newColor = e.target.value;
    setColor(newColor);
    saveToHistory({ color: newColor });
  };

  const handleFontSize = (val: number[]): void => {
    const newFontSize = val[0];
    setFontSize(newFontSize);
    saveToHistory({ fontSize: newFontSize });
  };

  const handleLineHeight = (val: number[]): void => {
    const newLineH = val[0];
    setLineH(newLineH);
    saveToHistory({ lineH: newLineH });
  };

  const handleStroke = (val: number[]): void => {
    const newStroke = val[0];
    setStroke(newStroke);
    saveToHistory({ stroke: newStroke });
  };

  const handleStrokeColor = (e: ChangeEvent<HTMLInputElement>): void => {
    const newStrokeColor = e.target.value;
    setStrokeColor(newStrokeColor);
    saveToHistory({ strokeColor: newStrokeColor });
  };

  const draw = (ctx: CanvasRenderingContext2D): void => {
    if (!img) return;

    ctx.canvas.width = 512;
    ctx.canvas.height = 512;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = transparent ? "rgba(255, 255, 255, 0)" : bgColor;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (isTextBehind) drawText(ctx);

    ctx.drawImage(img, 0, 0, 512, 512);

    if (!isTextBehind) drawText(ctx);
  };

  const drawText = (ctx: CanvasRenderingContext2D): void => {
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

  const download = (name: string): void => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${name}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const centerText = (): void => {
    const newPosition = { x: 256, y: 256 };
    setPosition(newPosition);
    saveToHistory({ position: newPosition });
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent): void => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z" && e.shiftKey) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-4 mx-auto px-4 pt-8 pb-16 max-w-6xl">
      <TooltipProvider>
        <div
          className="flex flex-col gap-4 items-center"
          style={{ width: "min(100%, 512px)" }}
          ref={canvasRef}
        >
          <div className="flex justify-between w-full mb-2">
            <div className="flex gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleUndo}
                    disabled={currentStateIndex <= 0}
                    aria-label="Undo last action"
                  >
                    <Undo2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Undo (Ctrl+Z)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleRedo}
                    disabled={currentStateIndex >= history.length - 1}
                    aria-label="Redo last action"
                  >
                    <Redo2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Redo (Ctrl+Shift+Z)</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger
                    aria-label="Open sticker selection dialog"
                    className="cursor-pointer -skew-x-12 h-10 px-6 has-[>svg]:px-4 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
                  >
                    <span className="skew-x-12 text-lg font-semibold flex items-center gap-2">
                      <ImageIcon className="size-5" aria-hidden="true" />
                      Select Sticker
                    </span>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Choose a sticker</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="lg:max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Select Sticker</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 h-[512px] overflow-y-auto px-4 py-2">
                  {stickers.map((sticker) => (
                    <DialogClose
                      key={sticker.name}
                      className="aspect-square rounded-xl hover:outline-4 outline-offset-4 outline-primary-foreground cursor-pointer transition-all hover:scale-105 p-2 border border-gray-200 hover:border-primary hover:shadow-md"
                      onClick={() => handleSetImage(sticker as StickerImage)}
                    >
                      <img
                        src={sticker.image}
                        alt={sticker.name}
                        className="object-contain w-full h-full"
                      />
                      <p className="text-center text-xs mt-1 truncate">{sticker.name}</p>
                    </DialogClose>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="relative border rounded-lg overflow-hidden shadow-sm min-h-[300px] max-h-[512px] w-full">
            <Canvas draw={draw} />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="-skew-x-12 mt-2"
                size="lg"
                onClick={() => download(name)}
                variant="default"
                aria-label="Download sticker"
              >
                <span className="skew-x-12 text-lg font-semibold flex items-center gap-2">
                  <Download className="size-5" aria-hidden="true" />
                  Download Sticker
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save sticker (Ctrl+S)</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-full lg:w-auto flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="text" className="flex items-center gap-1">
                <Text className="hidden sm:block sm:size-4" /> Text
              </TabsTrigger>
              <TabsTrigger value="position" className="flex items-center gap-1">
                <MoveHorizontal className="hidden sm:block sm:size-4" /> Position
              </TabsTrigger>
              <TabsTrigger value="style" className="flex items-center gap-1">
                <Palette className="hidden sm:block sm:size-4" /> Style
              </TabsTrigger>
              <TabsTrigger value="background" className="flex items-center gap-1">
                <Layers className="hidden sm:block sm:size-4" /> Layout
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="content" className="block mb-1 font-medium" id="content-label">
                    <Text className="size-4 inline mr-1" aria-hidden="true" /> Sticker Text
                  </label>
                  <Textarea
                    name="content"
                    id="content"
                    className="w-full min-h-[100px] font-mono resize-vertical"
                    value={text}
                    onChange={handleTextChange}
                    onKeyDown={handleTextKeyDown}
                    placeholder="Enter your text here..."
                    aria-labelledby="content-label"
                    aria-describedby="content-description"
                  />
                  <p id="content-description" className="sr-only">
                    Text that will appear on your sticker. Press Enter for new line.
                  </p>
                </div>

                <fieldset>
                  <legend className="flex items-center gap-2 mb-2 font-medium">
                    <Type className="size-4" aria-hidden="true" /> Orientation
                  </legend>
                  <RadioGroup
                    className="flex flex-col sm:flex-row gap-4"
                    value={orientation}
                    onValueChange={handleOrientation}
                    aria-label="Text orientation"
                  >
                    <div className="flex items-center gap-1 border rounded-md px-3 py-2 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="horizontal" id="horizontal" />
                      <label
                        htmlFor="horizontal"
                        className="cursor-pointer flex items-center gap-1"
                      >
                        <MoveHorizontal className="size-4" aria-hidden="true" /> Horizontal Line
                        Breaks
                      </label>
                    </div>
                    <div className="flex items-center gap-1 border rounded-md px-3 py-2 hover:bg-muted/50 cursor-pointer">
                      <RadioGroupItem value="vertical" id="vertical" />
                      <label htmlFor="vertical" className="cursor-pointer flex items-center gap-1">
                        <MoveVertical className="size-4" /> Vertical (No Line Breaks)
                      </label>
                    </div>
                  </RadioGroup>
                </fieldset>
              </div>
            </TabsContent>

            <TabsContent value="position" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 items-center">
                  <Button
                    variant="outline"
                    onClick={centerText}
                    className="flex items-center gap-1"
                  >
                    <Maximize className="size-4" /> Center Text
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Tip: You can also drag the text directly on the canvas
                  </p>
                </div>

                <div>
                  <label htmlFor="position-x" className="mb-1 font-medium flex items-center gap-1">
                    <MoveHorizontal className="size-4" /> Horizontal Position: {position.x}
                  </label>
                  <Slider
                    id="position-x"
                    step={1}
                    max={512}
                    onValueChange={handlePositionX}
                    value={[position.x]}
                    className="mb-4"
                    aria-labelledby="position-x-label"
                    aria-valuemin={0}
                    aria-valuemax={512}
                    aria-valuenow={position.x}
                  />
                </div>

                <div>
                  <label htmlFor="position-y" className="mb-1 font-medium flex items-center gap-1">
                    <MoveVertical className="size-4" /> Vertical Position: {position.y}
                  </label>
                  <Slider
                    id="position-y"
                    step={1}
                    max={512}
                    onValueChange={handlePositionY}
                    value={[position.y]}
                    className="mb-4"
                  />
                </div>

                <div>
                  <label htmlFor="rotate" className="mb-1 font-medium flex items-center gap-1">
                    <RotateCcw className="size-4" /> Rotate: {rotate}&deg;
                  </label>
                  <Slider
                    id="rotate"
                    step={1}
                    min={-180}
                    max={180}
                    onValueChange={handleRotate}
                    value={[rotate]}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="style" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <label htmlFor="text-color" className="font-medium">
                    Text Color:
                  </label>
                  <div className="flex items-center border rounded p-1">
                    <input
                      type="color"
                      name="text-color"
                      id="text-color"
                      className="size-8 cursor-pointer"
                      value={color}
                      onChange={handleTextColor}
                    />
                    <span className="ml-2 text-xs text-muted-foreground">{color}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <label htmlFor="stroke-color" className="font-medium">
                    Outline Color:
                  </label>
                  <div className="flex items-center border rounded p-1">
                    <input
                      type="color"
                      name="stroke-color"
                      id="stroke-color"
                      className="size-8 cursor-pointer"
                      value={strokeColor}
                      onChange={handleStrokeColor}
                    />
                    <span className="ml-2 text-xs text-muted-foreground">{strokeColor}</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="font-size" className="mb-1 font-medium flex items-center gap-1">
                    Font Size: {fontSize}px
                  </label>
                  <Slider
                    id="font-size"
                    step={1}
                    min={12}
                    max={120}
                    onValueChange={handleFontSize}
                    value={[fontSize]}
                    className="mb-4"
                  />
                </div>

                <div>
                  <label htmlFor="line-height" className="mb-1 font-medium flex items-center gap-1">
                    Line Height: {lineH}px
                  </label>
                  <Slider
                    id="line-height"
                    step={1}
                    min={12}
                    max={120}
                    onValueChange={handleLineHeight}
                    value={[lineH]}
                    className="mb-4"
                  />
                </div>

                <div>
                  <label
                    htmlFor="stroke-width"
                    className="mb-1 font-medium flex items-center gap-1"
                  >
                    Outline Width: {stroke}px
                  </label>
                  <Slider
                    id="stroke-width"
                    step={1}
                    min={0}
                    max={20}
                    onValueChange={handleStroke}
                    value={[stroke]}
                    className="mb-4"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="background" className="p-4 border rounded-lg mt-2">
              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label
                    id="text-behind-label"
                    htmlFor="text-behind"
                    className="font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      id="text-behind"
                      aria-labelledby="text-behind-label"
                      onCheckedChange={handleTextBehind}
                      checked={isTextBehind}
                    />
                    <span className="flex items-center gap-1">
                      {isTextBehind ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                      {isTextBehind ? "Text behind image" : "Text in front of image"}
                    </span>
                  </label>
                  <p className="text-sm text-muted-foreground ml-6">
                    {isTextBehind
                      ? "Text will be drawn behind the sticker image"
                      : "Text will be drawn on top of the sticker image"}
                  </p>
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="transparency"
                    className="font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <Checkbox
                      id="transparency"
                      onCheckedChange={handleTransparent}
                      checked={transparent}
                    />
                    <span>Transparent Background</span>
                  </label>

                  {!transparent && (
                    <div className="mt-2 ml-6">
                      <label htmlFor="bg-color" className="flex items-center gap-2 font-medium">
                        <span>Background Color: </span>
                        <div className="flex items-center border rounded p-1">
                          <input
                            type="color"
                            name="bg-color"
                            id="bg-color"
                            className="size-8 cursor-pointer"
                            value={bgColor}
                            onChange={handleBgColor}
                          />
                          <span className="ml-2 text-xs text-muted-foreground">{bgColor}</span>
                        </div>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default StickerWrapper;
