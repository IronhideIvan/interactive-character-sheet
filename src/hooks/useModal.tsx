import { useState } from "react";

export const useModal = (isOpenByDefault?: boolean) => {
  const [open, setOpen] = useState<boolean>(isOpenByDefault ?? false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenClose = (isOpen: boolean) => {
    setOpen(isOpen);
  };

  return {
    isOpen: open,
    open: handleOpen,
    close: handleClose,
    setOpen: handleOpenClose,
  };
};
