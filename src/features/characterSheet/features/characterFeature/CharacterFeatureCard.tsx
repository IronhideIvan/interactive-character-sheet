import SimpleDialog from "@/components/dialog/SimpleDialog";
import MarkdownPreview from "@/components/markdown/MarkdownPreview";
import CustomNotesManager from "@/features/general/notes/CustomNotesManager";
import WidgetPaper from "@/components/WidgetPaper";
import { useModal } from "@/hooks/useModal";
import { CharacterFeature } from "@/types/character/characterFeature";
import { Feature } from "@/types/data/feature";
import { IconButton, Text, VStack } from "@chakra-ui/react";
import { JSX } from "react";
import { FaEye } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import CustomNotesSection from "@/features/general/notes/CustomNotesSection";

type CharacterFeatureCardProps = {
  feature: Feature;
  characterFeature: CharacterFeature;
};

const CharacterFeatureCard = ({ feature }: CharacterFeatureCardProps): JSX.Element => {
  const { isOpen: isFeatureDetailsOpen, open: openFeatureDetails, close: closeFeatureDetails } = useModal();
  const { isOpen: isNotesManagerOpen, open: openNotesManager, close: closeNotesManager } = useModal();

  return (
    <WidgetPaper pos={"relative"}>
      <IconButton
        size={"sm"}
        variant={"ghost"}
        rounded={"full"}
        pos={"absolute"}
        left={2}
        top={2}
        onClick={() => {
          openNotesManager();
        }}
      >
        <FaNoteSticky />
      </IconButton>
      <IconButton
        size={"sm"}
        variant={"ghost"}
        rounded={"full"}
        pos={"absolute"}
        right={2}
        top={2}
        onClick={() => {
          openFeatureDetails();
        }}
      >
        <FaEye />
      </IconButton>
      <VStack p={2} width={"100%"}>
        <Text>{feature.name}</Text>
        <Text>{feature.caption}</Text>
        <Text textAlign={"center"}>{feature.shortDescription}</Text>
        <CustomNotesSection parentId={feature.id} />
      </VStack>
      {isFeatureDetailsOpen && (
        <SimpleDialog
          open={isFeatureDetailsOpen}
          title={feature.name}
          onClose={closeFeatureDetails}
        >
          <MarkdownPreview source={feature.description} />
        </SimpleDialog>
      )}
      {isNotesManagerOpen && (
        <SimpleDialog
          open={isNotesManagerOpen}
          title={`${feature.name} - Notes`}
          onClose={closeNotesManager}
        >
          <CustomNotesManager
            parentId={feature.id}
          />
        </SimpleDialog>
      )}

    </WidgetPaper>
  );
};

export default CharacterFeatureCard;
