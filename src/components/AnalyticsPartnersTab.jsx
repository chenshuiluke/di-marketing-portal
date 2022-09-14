import React, { useState, useEffect } from "react";
import axios from "axios";
import { CopyIcon } from "@chakra-ui/icons";
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

const OSPartnersTab = () => {
  const [partners, setPartners] = useState(null);

  useEffect(() => {
    axios.get("https://di-marketing-server-iuzlr.ondigitalocean.app/api/getAnalyticsPartners").then((res) => {
      console.log(res.data);
      setPartners(res.data);
    });
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Analytics Partner Pages</TableCaption>
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
                          target='_blank'
                          href={"https://" + partner.short_url}>
                          {partner.short_url}
                        </a>
                        <Tooltip label="Copy to clipboard">
                          <span
                            onClick={() =>
                              navigator.clipboard.writeText(partner.short_url)
                            }
                            style={{ cursor: "pointer" }}>
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

export default OSPartnersTab;
