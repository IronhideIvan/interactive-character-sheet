import FloatingLabel from "@/components/FloatingLabel";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Box, Field, Flex, HStack, IconButton, NumberInput, Text, VStack } from "@chakra-ui/react";
import { JSX, ReactNode } from "react";
import { setDeathSaves } from "../../basicInformationSlice";
import { FaMinus, FaPlus } from "react-icons/fa";
import { GiAngelOutfit, GiDeathZone } from "react-icons/gi";

const DeathSavesWidget = (): JSX.Element => {
  const deathSaves = useAppSelector(state => state.basicInformation.latest.deathSaves);
  const dispatch = useAppDispatch();

  const handleSuccessChange = (value: number) => {
    dispatch(setDeathSaves({ ...deathSaves, successCount: value }));
  };

  const handleFailureChange = (value: number) => {
    dispatch(setDeathSaves({ ...deathSaves, failCount: value }));
  };

  return (
    <FloatingLabel label="Death Saves" floating>
      <Flex
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        borderWidth={"1px"}
        borderColor={"border"}
        borderRadius={"md"}
        paddingY={1}
      >
        <HStack zIndex={1}>
          <DeathSaveInput
            label="Success"
            value={deathSaves.successCount}
            onValueChanged={handleSuccessChange}
            icon={<GiAngelOutfit color="blue" />}
          />
          <DeathSaveInput
            label="Failure"
            value={deathSaves.failCount}
            onValueChanged={handleFailureChange}
            icon={<GiDeathZone color="red" />}
          />
        </HStack>
      </Flex>
    </FloatingLabel>
  );
};

type DeathSaveInputProps = {
  value: number;
  onValueChanged: (value: number) => void;
  icon: ReactNode;
  label: string;
};

const DeathSaveInput = ({
  value, onValueChanged, icon, label,
}: DeathSaveInputProps): JSX.Element => {
  return (
    <Field.Root>
      <NumberInput.Root
        value={value.toString()}
        onValueChange={(e) => {
          onValueChanged(e.valueAsNumber);
        }}
        unstyled
        spinOnPress={false}
      >
        <VStack padding={0} gap={0}>
          <HStack gap="2" position={"relative"}>
            <Box
              display={"flex"}
              position={"absolute"}
              width={"100%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              fontSize={"2rem"}
              opacity={0.15}
            >
              {icon}
            </Box>

            <NumberInput.DecrementTrigger asChild>
              <IconButton variant="outline" size="xs">
                <FaMinus />
              </IconButton>
            </NumberInput.DecrementTrigger>
            <NumberInput.ValueText
              textAlign="center"
              fontSize="lg"
              minW="3ch"
              fontWeight={"bold"}
            />
            <NumberInput.IncrementTrigger asChild>
              <IconButton variant="outline" size="xs">
                <FaPlus />
              </IconButton>
            </NumberInput.IncrementTrigger>
          </HStack>
          <Field.Label marginTop={-2}>
            <Text textStyle={"xs"}>{label}</Text>
          </Field.Label>
        </VStack>
      </NumberInput.Root>
    </Field.Root>
  );
};

export default DeathSavesWidget;
