import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import Select from "react-select";
import { Widget } from "@uploadcare/react-widget";

const pageOptions = [
  {
    value: "https://www.dentalintel.com/partner-page-bundle?",
    label: "Bundle (Engagement + Analytics)",
  },
  { value: "https://www.dentalintel.com/partner-page-analytics?", label: "Analytics" },
  {
    value: "https://www.dentalintel.com/partner-page-engagement?",
    label: "Engagement",
  },
];
export default function CreatePageModal(props) {
  return (
    <ModalContent>
      <ModalHeader>
        <h2 className='text-center'>Page Creation</h2>
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Select
          value={props.baseUrl}
          onChange={(e) => props.setBaseUrl(e)}
          placeholder={<div>Product</div>}
          options={pageOptions}
        />
        <small id='url_help' className='form-text text-muted text-center'>
          What kind of page are you creating?
        </small>
        <input
          value={props.slashTag}
          onChange={(e) => props.setSlashTag(e.target.value)}
          className='form-control mt-3'
          placeholder='Slash Tag - e.g. get.dentalintel.com/THIS-IS-A-SLASH-TAG'
          type='text'
        />
        <small id='slash_help' className='form-text text-muted text-center'>
          No slashes. Only use - and _ when seperating words.
        </small>
        <input
          value={props.campaignId}
          onChange={(e) => props.setCampaignId(e.target.value)}
          placeholder='Salesforce Campaign ID'
          type='text'
          className='form-control mt-3'
        />
        <small id='slash_help' className='form-text text-muted text-center'>
          This is required. Copy directly from Salesforce.
        </small>
        <input
          value={props.partnerName}
          onChange={(e) => props.setPartnerName(e.target.value)}
          placeholder='Partner Name / Name of Page'
          type='text'
          className='form-control mt-3 mb-2'
        />
        <br />
        <Widget
          onChange={(fileInfo) => props.setPartnerLogo(fileInfo.cdnUrl)}
          publicKey='f40254048b87aa829d5f'
        />
        <br />
        <small id='slash_help' className='form-text text-muted text-center'>
          Upload Partner Logo
        </small>
      </ModalBody>
      <ModalFooter>
        <ButtonGroup spacing='6'>
          <Button
            style={{ color: "#007bff" }}
            onClick={props.onClose}
            _hover={{ bg: "brand.secondary" }}
            bg='brand.secondary'>
            Close
          </Button>
          <Button
            className='px-5'
            onClick={props.createPartner}
            _hover={{ bg: "brand.hover" }}
            bg='brand.main'>
            Create
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </ModalContent>
  );
}
