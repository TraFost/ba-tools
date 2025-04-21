import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
}

const NavDrawer: FC<Props> = (props) => {
  const { children, trigger, title } = props;

  return (
    <Drawer>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="h-full">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <div className="p-4 overflow-y-auto text-secondary-foreground">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};

export default NavDrawer;
