import React, { useState, useEffect } from "react";
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

const ReportPartnersTab = () => {
  const [partners, setPartners] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8200/api/getGrowthReportPartners")
      .then((res) => {
        console.log(res.data);
        setPartners(res.data);
      });
  }, []);

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Growth Report Partner Pages</TableCaption>
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

export default ReportPartnersTab;
