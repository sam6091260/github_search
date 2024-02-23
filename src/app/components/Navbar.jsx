import { Box, Button, Flex } from "@/app/chakra";
import { Image, useDisclosure } from "@/app/chakra-next";
import HistoryModal from "./HistoryModal";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  return (
    <Flex justifyContent={"space-between"} py={6} alignItems={"cener"}>
      <Box position={"relative"} minHeight={20} flex="1">
        <Image src={"/logo.png"} fill alt="github logo" width={50} />
      </Box>
      <Box className="signDiv">
        {session ? (
          <>
            <h2>
              Signed in as <br />
              {session.user.name}
            </h2>
            <button className="signBtn" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <>
            {/* <h2>Not signed in</h2> */}
            <button className="signBtn" onClick={() => signIn()}>
              Sign in
            </button>
          </>
        )}
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
