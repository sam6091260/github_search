import { Box, Button, Flex } from "@/app/chakra";
import { Image, useDisclosure } from "@/app/chakra-next";
import HistoryModal from "./HistoryModal";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex justifyContent={"space-between"} py={6} alignItems={"cener"}>
      <Box position={"relative"} minHeight={20}>
        <Image src={"/logo.png"} fill alt="github logo" width={50} />
      </Box>
      <Box>
        <Button size="md" colorScheme="whatsapp" onClick={onOpen}>
          Search History
        </Button>
      </Box>

      {isOpen && <HistoryModal isOpen={isOpen} onClose={onClose} />}
    </Flex>
  );
};

export default Navbar;
