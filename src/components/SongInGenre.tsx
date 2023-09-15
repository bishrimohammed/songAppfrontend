import { useState } from "react";
import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";
import _ from "lodash";
import { useSelector } from "react-redux";

// Styled component for the album statistics container
const AlbumStatsContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Styled component for the table container
const TableContainer = styled(Box)`
  max-width: 95%;
  width: 100%;
  //margin-top: 7px;
  overflow-x: auto;
`;

// Styled component for the table
const AlbumTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin: 16px 0;
`;

// Styled component for table headers
const TableHeader = styled.th`
  padding: 8px;
  background-color: #f0f0f0;
  text-align: left;
  border: 1px solid #ddd;
`;

// Styled component for table data cells
const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
`;
const Button = styled.button`
  background-color: #007bff; /* Blue color, you can change this */
  color: #fff; /* Text color */
  padding: 8px 16px; /* Padding around the text */
  border: none; /* Remove button border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Show pointer cursor on hover */
  margin: 4px; /* Margin between buttons */
  font-size: 14px; /* Font size */
  transition: background-color 0.3s ease; /* Smooth transition for background color */
  width: 90px;
  &:hover {
    background-color: #0056b3; /* Darker blue color on hover */
  }

  &:disabled {
    background-color: #ccc; /* Grayed-out background for disabled button */
    cursor: not-allowed; /* Show disabled cursor */
  }
`;
const FlexContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const Select = styled.select`
  display: inline-block;
  width: 100%;
  height: calc(2.25rem + 2px);
  padding: 0.375rem 1.75rem 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  vertical-align: middle;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.075);
`;
const Option = styled.option``;
const FilterContiner = styled.div`
  width: 10rem;
`;
function SongInGenre() {
  const albums = useSelector(
    (state) => state.songStatistics.Number_of_Song_genreStatistics
  );
  //const albums = albumsData.Number_of_Song_genreStatistics;
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  //const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  var paginatedAlbums = [];
  var totalPages;
  if (albums) {
    paginatedAlbums = _.slice(albums, startIndex, endIndex);
    totalPages = Math.ceil(albums.length / itemsPerPage);
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <AlbumStatsContainer>
      <Text
        textAlign="left      
      "
        fontWeight={600}
      >
        Total number of Song in every Genre
      </Text>
      <TableContainer>
        <AlbumTable>
          <thead>
            <tr>
              <TableHeader>Genre</TableHeader>
              <TableHeader>Song Count</TableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedAlbums.map((album, index) => (
              <tr key={index}>
                <TableCell>{album._id}</TableCell>
                <TableCell>{album.count}</TableCell>
              </tr>
            ))}
          </tbody>
        </AlbumTable>
      </TableContainer>
      <Flex>
        <FlexContainer>
          <Text>
            Page {page} of {totalPages}
          </Text>
          <Flex>
            <Button
              variant="primary"
              mr={3}
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              next
            </Button>
          </Flex>
        </FlexContainer>
        <FilterContiner>
          <Text marginBottom={2}>{itemsPerPage} per Page</Text>
          <Select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(e.target.value);
            }}
          >
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="15">15</Option>
          </Select>
        </FilterContiner>
      </Flex>
      {/*<Text>
        Page {page} of {totalPages}
      </Text>
      <Flex>
        <Button
          variant="primary"
          mr={3}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          next
        </Button>
      </Flex>*/}
    </AlbumStatsContainer>
  );
}

export default SongInGenre;
