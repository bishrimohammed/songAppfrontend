/* eslint-disable react-refresh/only-export-components */
import { Flex, Box, Text } from "rebass";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { SongsState } from "../types/Song.type";

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

function Total_song_artist_album_genre() {
  const albums = useSelector(
    (state: SongsState) => state.songStatistics.Allstatistics
  );

  return (
    <>
      {albums && (
        <AlbumStatsContainer>
          <Text
            textAlign="left      
      "
            fontWeight={600}
          >
            Total number of Song, Album, Artist and Genre
          </Text>
          <TableContainer>
            <AlbumTable>
              <thead>
                <tr>
                  <TableHeader>Total song</TableHeader>
                  <TableHeader>Total album</TableHeader>
                  <TableHeader>Total artist</TableHeader>
                  <TableHeader>Total genre</TableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <TableCell>{albums.totalSongs}</TableCell>
                  <TableCell>{albums.totalAlbum}</TableCell>
                  <TableCell>{albums.totalArtists}</TableCell>
                  <TableCell>{albums.totalGenres}</TableCell>
                </tr>
              </tbody>
            </AlbumTable>
          </TableContainer>
        </AlbumStatsContainer>
      )}
    </>
  );
}

export default Total_song_artist_album_genre;
