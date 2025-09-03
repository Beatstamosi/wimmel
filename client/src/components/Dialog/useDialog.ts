import { useState } from "react";
import { useNavigate } from "react-router-dom";

function useDialog(dialogRef: React.RefObject<HTMLDialogElement | null>) {
  const [showPopUp, setShowPopUp] = useState(false);
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

  const triggerDialog = () => {
    setShowPopUp(true);

    setTimeout(() => {
      setShowPopUp(false);
    }, 1200);
  };

  return { isOpen, openDialog, closeDialog, showPopUp, triggerDialog };
}

export default useDialog;
