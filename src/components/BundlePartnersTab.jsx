import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tooltip,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import useOnScreen from "../hooks/useOnScreen";
const BundlePartnersTab = () => {
  const [partners, setPartners] = useState(null);
  // Ref for the element that we want to detect whether on screen
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref);
  useEffect(() => {
    axios
      .get(
        "https://di-marketing-server-iuzlr.ondigitalocean.app/api/getBundlePartners"
      )
      .then((res) => {
        console.log(res.data);
        setPartners(res.data);
      });
  }, [onScreen]);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Bundle Partner Pages</TableCaption>
          <Thead>
            <Tr>
              <Th>Partner Name</Th>
              <Th>URL</Th>
            </Tr>
          </Thead>
          <Tbody>
            {partners
              ? partners.map((partner) => (
                  <React.Fragment key={partner._id}>
                    <Tr>
                      <Td>{partner.partner_name}</Td>
                      <Td>
                        <a
                          style={{ color: "#007bff", marginRight: "10px" }}
                          target="_blank"
                          href={"https://" + partner.short_url}
                        >
                          {partner.short_url}
                        </a>
                        <Tooltip label="Copy to clipboard">
                          <span
                            onClick={() =>
                              navigator.clipboard.writeText(partner.short_url)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <CopyIcon />
                          </span>
                        </Tooltip>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))
              : null}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BundlePartnersTab;
