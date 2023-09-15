/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";
import _ from "lodash";
import { useSelector } from "react-redux";
import { SongsState } from "../types/Song.type";

// Styled component for the album statistics container
const SongAlbumStatsContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Styled component for the table container
const TableContainer = styled(Box)`
  max-width: 95%;
  width: 100%;
  margin-top: 16px;
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
function Song_and_album_of_Artist() {
  const albums = useSelector(
    (state: SongsState) =>
      state.songStatistics.Number_song_and_albumartistStatistics
  );

  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [page, setPage] = useState(1);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;

  let paginatedAlbums;
  let totalPages = 0;
  if (albums) {
    paginatedAlbums = _.slice(albums, startIndex, endIndex);
    totalPages = Math.ceil(albums.length / itemsPerPage);
  }
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <SongAlbumStatsContainer>
      <Text
        textAlign="left      
      "
        fontWeight={600}
      >
        Total number of Song and Albums each artist has
      </Text>
      <TableContainer>
        <AlbumTable>
          <thead>
            <tr>
              <TableHeader>Artist name</TableHeader>
              <TableHeader>Album Count</TableHeader>
              <TableHeader>Song Count</TableHeader>
            </tr>
          </thead>
          <tbody>
            {paginatedAlbums.map(
              (
                album: { _id: number; totalSongs: number; totalAlbums: number },
                index: number
              ) => (
                <tr key={index}>
                  <TableCell>{album._id}</TableCell>
                  <TableCell>{album.totalAlbums}</TableCell>
                  <TableCell>{album.totalSongs}</TableCell>
                </tr>
              )
            )}
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
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              console.log(e.target.value);

              setItemsPerPage(Number(e.target.value));
            }}
          >
            <Option value="5">5</Option>
            <Option value="10">10</Option>
            <Option value="15">15</Option>
          </Select>
        </FilterContiner>
      </Flex>
    </SongAlbumStatsContainer>
  );
}

export default Song_and_album_of_Artist;
