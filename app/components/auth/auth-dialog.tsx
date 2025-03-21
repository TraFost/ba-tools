import { Mail } from "lucide-react";
import type { FC } from "react";

import { Button } from "components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "components/ui/dialog";

interface Props {
  open: boolean;
  onClose: VoidFunction;
  onLogin: VoidFunction;
}

export const LoginModal: FC<Props> = ({ onClose, open, onLogin }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-center">Login</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <Button
            onClick={onLogin}
            className="flex items-center justify-center gap-2"
            variant="outline"
          >
            <Mail />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
