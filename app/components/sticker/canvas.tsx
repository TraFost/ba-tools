import { type FC, useEffect, useRef } from "react";

interface Props {
  draw: (ctx: CanvasRenderingContext2D) => void;
}

const Canvas: FC<Props> = (props) => {
  const { draw, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    draw(context);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      {...rest}
      className="w-full min-[426px]:w-[400px] min-[560px]:w-[512px]"
    />
  );
};

export default Canvas;
