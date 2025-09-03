import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useDialog(dialogRef: React.RefObject<HTMLDialogElement | null>) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openDialog = () => {
    setIsOpen(true);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    setIsOpen(false);
    dialogRef.current?.close();
    navigate("/");
  };

  return { isOpen, openDialog, closeDialog };
}

export default useDialog;
