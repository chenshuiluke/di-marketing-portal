import React, { useState } from "react";
import Layout from "../components/Layout";
import CreatePageModal from "../components/CreatePageModal";
import GrowthPlatformPartnersTab from "../components/GrowthPlatformPartnersTab";
import OSPartnersTab from "../components/OSPartnersTab";
import ModentoPartnersTab from "../components/ModentoPartnersTab";
import * as styles from "./../components/modules/page-creation.module.css";
import { Button } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import axios from "axios";

const PageCreation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertOpen, setAlertOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [slashTag, setSlashTag] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerLogo, setPartnerLogo] = useState("");

  const createPartner = () => {
    const body = {
      slashTag,
      campaignId,
      partnerName,
      partnerLogo,
      destinationUrl: `${baseUrl.value}campaign_id=${campaignId}&partner_logo=${partnerLogo}&utm_campaign=${campaignId}`,
      pageType: baseUrl.label,
    };

    axios.post("https://di-marketing-server-iuzlr.ondigitalocean.app/api/addPartner", body).then((res) => {
      console.log(res.data);

      if (res.data === "Already exists") {
        alert("URL with that Slash Tag already exists.");
      } else if (res.data === "Invalid format") {
        alert("Invalid format. Check that slash tag is formatted correctly.");
      } else {
        onClose();
        setSlashTag("");
        setCampaignId("");
        setPartnerName("");
        setPartnerLogo("");
        setAlertOpen(true);
        navigator.clipboard.writeText(res.data);
      }
    });
  };

  const reloadPage = () => {
    window.location.reload(false);
    setAlertOpen(false)
  }
  return (
    <Layout>
      <main>
        <Button
          className='mb-5'
          onClick={onOpen}
          _hover={{ bg: "brand.hover" }}
          bg='brand.main'>
          Create Page
        </Button>

        <Tabs isFitted variant='enclosed'>
          <TabList mb='1em'>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.gp_tab}>
              Bundle (Engagement & Analytics)
            </Tab>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.os_tab}>
              Analytics
            </Tab>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5"}}
              className={styles.modento_tab}>
              Engagement
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
             <GrowthPlatformPartnersTab/>
            </TabPanel>
            <TabPanel>
                <OSPartnersTab/>
            </TabPanel>
            <TabPanel>
              <ModentoPartnersTab/>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Modal
          closeOnOverlayClick={false}
          size={"2xl"}
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <CreatePageModal
            createPartner={createPartner}
            baseUrl={baseUrl}
            slashTag={slashTag}
            campaignId={campaignId}
            partnerName={partnerName}
            partnerLogo={partnerLogo}
            setBaseUrl={setBaseUrl}
            setSlashTag={setSlashTag}
            setCampaignId={setCampaignId}
            setPartnerName={setPartnerName}
            setPartnerLogo={setPartnerLogo}
            onClose={onClose}
          />
        </Modal>
        <AlertDialog isOpen={alertOpen} onClose={() => setAlertOpen(false)}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader
                className='text-center'
                fontSize='lg'
                fontWeight='bold'>
                Partner Created
              </AlertDialogHeader>

              <AlertDialogBody className='text-center'>
                Created link is now copied to your clipboard.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  mt={3}
                  _hover={{ bg: "brand.hover" }}
                  bg='brand.main'
                  onClick={reloadPage}>
                  Close
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </main>
    </Layout>
  );
};

export default PageCreation;
