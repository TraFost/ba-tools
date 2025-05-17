"use client";

import React, { type FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { CheckIcon, DownloadIcon, EllipsisIcon, Loader2, Share2Icon, XIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { BASE_URL } from "@/app/config/constants";
import { toast } from "sonner";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import type { ITrack } from "@/app/type/music-type";

interface Props {
  title: string;
  tracks: ITrack[];
}

const AlbumDropdown: FC<Props> = (props) => {
  const { title, tracks } = props;
  const pathname = usePathname();

  const handleShare = () => {
    navigator.clipboard.writeText(BASE_URL + pathname);
    toast.success("Copied to clipboard");
  };

  const handleDownloadAlbum = async () => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    let isCompleted = false;

    const toastId = toast("Preparing download...", {
      description: "This may take a while.",
      action: {
        label: "Cancel",
        onClick: () => {
          if (!isCompleted) {
            abortController.abort();
            toast.dismiss(toastId);
            toast.error("Download cancelled");
          }
        },
      },
      duration: Number.POSITIVE_INFINITY,
    });

    try {
      const zip = new JSZip();
      const folder = zip.folder(title) || zip;

      toast.loading("Downloading tracks...", {
        id: toastId,
        description: `0/${tracks.length} completed`,
        icon: <Loader2 className="animate-spin h-4 w-4" />,
        duration: Number.POSITIVE_INFINITY,
        action: {
          label: "Cancel",
          onClick: () => {
            if (!isCompleted) {
              abortController.abort();
              toast.error("Download cancelled", { id: toastId });
            }
          },
        },
      });

      for (let i = 0; i < tracks.length; i++) {
        if (signal.aborted) break;

        const track = tracks[i];
        try {
          const res = await fetch(track.src, { signal });
          const blob = await res.blob();
          folder.file(`${track.artist} - ${track.title}.ogg`, blob);

          toast.loading("Downloading tracks...", {
            id: toastId,
            description: `${i + 1}/${tracks.length} completed`,
            icon: <Loader2 className="animate-spin h-4 w-4" />,
            duration: Number.POSITIVE_INFINITY,
            action: {
              label: "Cancel",
              onClick: () => {
                if (!isCompleted) {
                  abortController.abort();
                  toast.error("Download cancelled", { id: toastId });
                }
              },
            },
          });
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(`Failed to fetch ${track.title}:`, err);
          }
        }
      }

      if (signal.aborted) return;

      toast.loading("Creating zip file...", {
        id: toastId,
        description: "Almost done",
        action: {
          label: "Cancel",
          onClick: () => {
            if (!isCompleted) {
              abortController.abort();
              toast.error("Download cancelled", { id: toastId });
            }
          },
        },
      });

      const content = await zip.generateAsync({ type: "blob" });
      isCompleted = true;

      toast.success("Download complete!", {
        id: toastId,
        icon: <CheckIcon />,
        description: `${tracks.length} tracks downloaded`,
        action: {
          label: "Close",
          onClick: () => {
            toast.dismiss(toastId);
          },
        },
      });

      saveAs(content, `${title}.zip`);
    } catch (err) {
      if (err.name !== "AbortError") {
        toast.error("Download failed", {
          id: toastId,
          description: err.message,
          icon: <XIcon />,
        });
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="hover:bg-black/10 rounded-full p-1.5 cursor-pointer">
          <EllipsisIcon />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="text-accent font-semibold">
        <DropdownMenuItem onClick={handleShare}>
          <Share2Icon />
          <span>Share</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadAlbum}>
          <DownloadIcon />
          <span>Download Album</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AlbumDropdown;
