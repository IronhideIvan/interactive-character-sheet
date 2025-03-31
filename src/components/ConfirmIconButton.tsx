import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { JSX, ReactNode, useState } from "react";
import { FaCheck } from "react-icons/fa";

type ConfirmIconButtonProps = {
  confirm?: IconButtonProps;
  children?: ReactNode;
  onConfirmClick?: () => void;
} & IconButtonProps;

const ConfirmIconButton = ({ confirm: confirmProps, children, onConfirmClick, ...baseProps }: ConfirmIconButtonProps): JSX.Element => {
  const [isConfirming, setIsConfirming] = useState(false);

  const handleClick = () => {
    if (isConfirming) {
      onConfirmClick?.();
      setIsConfirming(false);
    }
    else {
      setIsConfirming(true);
    }
  };

  return (
    <IconButton
      {...baseProps}
      variant={(isConfirming && confirmProps?.variant) ? confirmProps.variant : baseProps.variant}
      color={(isConfirming && confirmProps?.color) ? confirmProps.color : baseProps.color}
      background={(isConfirming && confirmProps?.background) ? confirmProps.background : baseProps.background}
      colorPalette={(isConfirming && confirmProps?.colorPalette) ? confirmProps.colorPalette : baseProps.colorPalette}
      onClick={handleClick}
      onMouseLeave={() => {
        setIsConfirming(false);
      }}
    >
      {isConfirming
        ? (
          <FaCheck />
        )
        : children}
    </IconButton>
  );
};

export default ConfirmIconButton;
