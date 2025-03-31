import { Button } from "components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import { Link } from "components/ui/link";
import { Github, InfoIcon, Instagram, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import type { FC } from "react";

interface MaintainerInfoProps {
  triggerClassName?: string;
}

const authors = [
  {
    name: "Galih Aditya D.",
    role: "Author",
    social: {
      instagram: "https://www.instagram.com/yagalihadit/",
      linkedin: "https://www.linkedin.com/in/galih-aditya-8914a6216/",
      github: "https://github.com/samsulpanjul",
      email: "mailto:galih@example.com",
    },
  },
  {
    name: "Rahman Nurudin",
    role: "Core Maintainer",
    social: {
      instagram: "https://www.instagram.com/rahmannrdn/",
      linkedin: "https://www.linkedin.com/in/rahmannrdn/",
      github: "https://github.com/TraFost",
      email: "mailto:rahmannurudin29@gmail.com",
    },
  },
];

const MaintainerInfo: FC<MaintainerInfoProps> = ({ triggerClassName }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={triggerClassName}
          aria-label="About maintainer"
        >
          <InfoIcon className="size-5 group-hover:text-primary transition-colors" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl text-accent">About the Authors</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {authors.map((author) => (
            <div key={author.name} className="flex flex-col items-center gap-3">
              <div className="relative w-20 h-20 overflow-hidden rounded-full border-2 border-primary">
                <Image
                  src="/icon.png"
                  alt={`${author.name} avatar`}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center">
                <h3 className="text-lg font-bold text-primary-foreground">{author.name}</h3>
                <p className="text-sm text-accent-foreground">{author.role}</p>
              </div>

              <div className="flex gap-3">
                <Link
                  href={author.social.github}
                  className="text-accent hover:text-primary transition-colors"
                  target="_blank"
                >
                  <Github className="size-4" />
                </Link>
                <Link
                  href={author.social.email}
                  className="text-accent hover:text-primary transition-colors"
                >
                  <Mail className="size-4" />
                </Link>
                <Link
                  href={author.social.linkedin}
                  className="text-accent hover:text-primary transition-colors"
                  target="_blank"
                >
                  <Linkedin className="size-4" />
                </Link>
                <Link
                  href={author.social.instagram}
                  className="text-accent hover:text-primary transition-colors"
                  target="_blank"
                >
                  <Instagram className="size-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-center text-muted-foreground leading-relaxed">
          <p>This project is not affiliated with Nexon or Yostar.</p>
        </div>

        <div className="bg-secondary/30 p-3 rounded-lg text-xs text-center text-secondary-foreground mt-2">
          <p>
            Version 0.2.0 • Last updated: March 2025
            <br />
            <Link
              href="https://github.com/TraFost/ba-tools"
              className="text-primary hover:underline"
              target="_blank"
            >
              View this project on GitHub
            </Link>
          </p>
        </div>

        <DialogClose asChild>
          <Button variant="outline" className="mt-3 w-full border-primary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default MaintainerInfo;
