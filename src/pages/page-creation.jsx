import React, { useState } from "react";
import Layout from "../components/Layout";
import CreatePageModal from "../components/CreatePageModal";
import EngagementPartnersTab from "../components/EngagementPartnersTab";
import AnalyticsPartnerTab from "../components/AnalyticsPartnersTab";
import BundlePartnersTab from "../components/BundlePartnersTab";
import * as styles from "./../components/modules/page-creation.module.css";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
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
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReportPartnersTab from "../components/ReportPartnersTab";

const utmMediumMap = {
  "Bundle (Engagement + Analytics)": "partner_page_dental_intelligence",
  Analytics: "partner_page_analytics",
  Engagement: "partner_page_engagement",
  "Growth Report": "partner_page_growth_report",
};
const tabIndexMap = {
  "Bundle (Engagement + Analytics)": 3,
  Analytics: 1,
  Engagement: 0,
  "Growth Report": 2,
};
let defaultTab = null;
if (typeof window !== "undefined") {
  if (localStorage.getItem("defaultTabIndex") != null) {
    defaultTab = parseInt(localStorage.getItem("defaultTabIndex"));
    localStorage.clear();
  }
}
const PageCreation = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alertOpen, setAlertOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState("");
  const [slashTag, setSlashTag] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [partnerLogo, setPartnerLogo] = useState("");
  const toast = useToast();

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const createPartner = () => {
    const body = {
      slashTag,
      campaignId,
      partnerName,
      partnerLogo,
      destinationUrl: `${baseUrl.value}campaign_id=${campaignId}&partner_logo=${partnerLogo}&utm_campaign=${campaignId}&utm_source=partner_referral`,
      pageType: baseUrl.label,
    };

    if (baseUrl != null && (baseUrl.label == "" || baseUrl.label == null)) {
      return toast({
        title: "Please select a page type",
        status: "warning",
      });
    }
    if (slashTag == "") {
      return toast({
        title: "Please enter a tag",
        status: "warning",
      });
    }
    if (campaignId == "") {
      return toast({
        title: "Please enter a campaign id",
        status: "warning",
      });
    }
    if (partnerLogo == "") {
      return toast({
        title: "Please select a partner logo",
        status: "warning",
      });
    }
    if (partnerName == "") {
      return toast({
        title: "Please enter a partner name",
        status: "warning",
      });
    }
    const utmMedium = utmMediumMap[body.pageType];
    body.destinationUrl += "&utm_medium=" + utmMedium;

    axios
      .post(
        "https://di-marketing-server-iuzlr.ondigitalocean.app/api/addPartner",
        body
      )
      .then((res) => {
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
          setTabIndex(5);
          setTimeout(() => {
            setTabIndex(tabIndexMap[body.pageType]);
          }, 500);
        }
      });
  };

  const reloadPage = () => {
    // window.location.href = window.location.href;
    setAlertOpen(false);
  };
  return (
    <Layout>
      <main>
        <Button
          className="mb-5"
          onClick={onOpen}
          _hover={{ bg: "brand.hover" }}
          bg="brand.main"
        >
          Create Page
        </Button>

        <Tabs
          isFitted
          variant="enclosed"
          index={tabIndex}
          onChange={handleTabsChange}
        >
          <TabList mb="1em">
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.gp_tab}
            >
              Engagement
            </Tab>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.os_tab}
            >
              Analytics
            </Tab>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.os_tab}
            >
              Growth Report
            </Tab>
            <Tab
              _focus={{ outline: 0, backgroundColor: "#f2f3f5" }}
              className={styles.modento_tab}
            >
              Bundle
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EngagementPartnersTab />
            </TabPanel>
            <TabPanel>
              <AnalyticsPartnerTab />
            </TabPanel>
            <TabPanel>
              <ReportPartnersTab />
            </TabPanel>
            <TabPanel>
              <BundlePartnersTab />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Modal
          closeOnOverlayClick={false}
          size={"2xl"}
          isOpen={isOpen}
          onClose={onClose}
        >
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
                className="text-center"
                fontSize="lg"
                fontWeight="bold"
              >
                Partner Created
              </AlertDialogHeader>

              <AlertDialogBody className="text-center">
                Created link is now copied to your clipboard.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button
                  mt={3}
                  _hover={{ bg: "brand.hover" }}
                  bg="brand.main"
                  onClick={reloadPage}
                >
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
