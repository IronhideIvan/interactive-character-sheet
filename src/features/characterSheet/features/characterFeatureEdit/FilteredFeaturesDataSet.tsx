import { Box, HStack, IconButton, Table, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import { Feature } from "@/types/data/feature";
import { FaEye, FaMinus, FaPlus } from "react-icons/fa";

type FilteredFeaturesDataSetProps = {
  characterFeatures: Feature[];
  allFeatures: Feature[];
  onAdd: (feature: Feature) => void;
  onRemove: (feature: Feature) => void;
  onView: (feature: Feature) => void;
};

const FilteredFeaturesDataSet = ({
  characterFeatures,
  allFeatures,
  onAdd,
  onRemove,
  onView,
}: FilteredFeaturesDataSetProps): JSX.Element => {
  return (
    <Box display={"flex"} marginBottom={12}>
      <VStack rowGap={0}>
        <Table.Root variant={"outline"} showColumnBorder>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader key={"table.actions"} w={6} padding={1} />
              <Table.ColumnHeader
                minW={"3rem"}
                padding={0}
                paddingX={1}
                textAlign={"center"}
                key={"features.name"}
              >Name
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {allFeatures.map((item) => {
              const characterFeature = characterFeatures.find(cf => cf.id === item.id);
              return (
                <Table.Row key={item.id}>
                  <Table.Cell key={"row.actions"} padding={1}>
                    <HStack>
                      {characterFeature
                        ? (
                          <IconButton
                            size={"sm"}
                            variant={"ghost"}
                            rounded={"full"}
                            onClick={() => {
                              onRemove(item);
                            }}
                          >
                            <FaMinus />
                          </IconButton>
                        )
                        : (
                          <IconButton
                            size={"sm"}
                            variant={"ghost"}
                            rounded={"full"}
                            onClick={() => {
                              onAdd(item);
                            }}
                          >
                            <FaPlus />
                          </IconButton>
                        )}
                      <IconButton
                        size={"sm"}
                        variant={"ghost"}
                        rounded={"full"}
                        onClick={() => {
                          onView(item);
                        }}
                      >
                        <FaEye />
                      </IconButton>
                    </HStack>
                  </Table.Cell>
                  <Table.Cell
                    padding={1}
                    key={"row.name"}
                  >
                    {item.name}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </VStack>
    </Box>
  );
};

export default FilteredFeaturesDataSet;
