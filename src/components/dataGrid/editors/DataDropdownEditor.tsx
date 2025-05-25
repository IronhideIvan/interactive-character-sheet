import DynamicIcon from "@/components/DynamicIcon";
import { Icon } from "@/types/data/icon";
import { Box, HStack, ListCollection, Portal, Select, SelectRootProps } from "@chakra-ui/react";
import { JSX } from "react";

export type DataDropdownItem = {
  id: string;
  label: string;
  icon?: Icon;
};

type DataDropdownEditorProps = {
  collection: ListCollection<DataDropdownItem>;
  selectedItemIds: string[];
  onSelectionChange: (ids: string[]) => void;
} & SelectRootProps;

export const DataDropdownEditor = ({
  collection, selectedItemIds, onSelectionChange, ...rootProps
}: DataDropdownEditorProps): JSX.Element => {
  const handleItemSelected = (value: string[]) => {
    onSelectionChange(value);
  };

  console.log("ITEM COUNT: ".concat(collection.items.length.toString()));

  const selectedItem: DataDropdownItem | undefined
    = selectedItemIds.length > 0
      ? collection.items.find(i => i.id === selectedItemIds[0])
      : undefined;

  return (
    <Select.Root
      {...rootProps}
      collection={collection}
      width="100%"
      value={selectedItemIds}
      onValueChange={e => handleItemSelected(e.value)}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText>
            {selectedItem && (
              <HStack>
                <Box height={"1.5rem"} maxHeight={30}>
                  {selectedItem.icon && (
                    <DynamicIcon
                      iconId={selectedItem.icon.id}
                      color={selectedItem.icon.color}
                    />
                  )}
                </Box>
                {selectedItem.label}
                {selectedItemIds.length > 1 && "..."}
              </HStack>
            )}
          </Select.ValueText>
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {collection.items.map(item => (
              <Select.Item item={item} key={item.id} minHeight={"16px"}>
                <HStack paddingY={1} alignItems={"center"}>
                  <Box height={"1.5rem"} maxHeight={30}>
                    {item.icon && (
                      <DynamicIcon
                        iconId={item.icon.id}
                        color={item.icon.color}
                      />
                    )}
                  </Box>
                  {item.label}
                </HStack>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};
