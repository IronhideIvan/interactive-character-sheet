import { CloseButton, Drawer, DrawerRootProps, Portal } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";

type FloatingDrawerProps = DrawerRootProps & {
  title?: string;
  footer?: ReactNode;
  children: ReactNode;
};

const FloatingDrawer = ({ title, footer, children, ...props }: FloatingDrawerProps): JSX.Element => {
  return (
    <Drawer.Root {...props}>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding={4}>
          <Drawer.Content rounded="md">
            {title && (
              <Drawer.Header>
                <Drawer.Title>{title}</Drawer.Title>
              </Drawer.Header>
            )}
            <Drawer.Body>
              {children}
            </Drawer.Body>
            {footer && (
              <Drawer.Footer>
                {footer}
              </Drawer.Footer>
            )}
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default FloatingDrawer;
