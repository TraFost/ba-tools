import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";
import { useState, type FC, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
}

const NavDrawer: FC<Props> = (props) => {
  const { children, trigger, title } = props;
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest("[data-close-drawer]")) {
            setOpen(false);
          }
        }}
        className="h-full"
      >
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto text-secondary-foreground">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
