/* eslint-disable react/prop-types */
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songActions } from "../store/index";
import { Flex, Text } from "rebass";
import _ from "lodash";
import { SongsState, songType } from "../types/Song.type";
const Container1 = styled.div`
  padding: 0 3%;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
  @media (max-width: 700px) {
    padding: 0;
    flex-basis: 90%;
  }
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const AddButton = styled.button`
  padding: 15px 20px;
  border: none;
  letter-spacing: 1.4px;
  background-color: ${(props) => props.bgclor};
  color: ${(props) => props.textColor};
  font-weight: 500;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  cursor: pointer;
`;
const SongsListContainer = styled.div`
  width: 100%;
  position: relative;
`;

const FilterWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  margin-top: 10px;
`;
const FilterContiner = styled.div`
  width: 10rem;
`;
const Label = styled.div`
  display: inline-block;
  margin-bottom: 0.5rem;
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
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  position: relative;
  margin-top: 15px;

  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const TableRow = styled.tr`
  & > th:last-child {
    column-span: 2;
  }
  :nth-of-type(even) {
    background-color: #dddddd;
  }
`;
const TBody = styled.tbody``;
const TableHead = styled.th`
  border: 1px solid #dddddd;
  text-align: center;
  padding: 10px;
`;
const TableData = styled.td`
  font-size: 14px;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;
const ActionIcon = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Icon = styled.span`
  background-color: #007bff;
  font-size: 13px;
  color: #fff; /* Text color */
  padding: 4px 10px; /* Padding around the text */
  border: none; /* Remove button border */
  border-radius: 4px;
  cursor: pointer;
`;
const FlexContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
const Button = styled.button`
  background-color: #007bff; /* Blue color, you can change this */
  color: #fff; /* Text color */
  padding: 8px 16px; /* Padding around the text */
  border: none; /* Remove button border */
  border-radius: 4px; /* Rounded corners */
  cursor: pointer; /* Show pointer cursor on hover */
  margin-right: 30px; /* Margin between buttons */
  font-size: 14px; /* Font size */
  width: 90px;
  transition: background-color 0.3s ease; /* Smooth transition for background color */

  &:hover {
    background-color: #0056b3; /* Darker blue color on hover */
  }

  &:disabled {
    background-color: #ccc; /* Grayed-out background for disabled button */
    cursor: not-allowed; /* Show disabled cursor */
  }
`;
interface porpsTypes {
  setSongtobeUpdated: (value: songType) => void;
  ishide: boolean;
  formShowHandler: () => void;
}
const SongList = (props: porpsTypes) => {
  const [isfilterApplyrd, setFilterData] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    artist: "",
    album: "",
    genre: "",
  });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const songs: songType[] = useSelector((state: SongsState) => state.songs);
  const filteredSongs: songType[] = useSelector(
    (state: SongsState) => state.filtedSongs
  );
  const [page, setPage] = useState(1);
  //const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  let paginatedAlbums: songType[];
  let totalPages: number;
  if (filteredSongs) {
    paginatedAlbums = _.slice(filteredSongs, startIndex, endIndex);
    totalPages = Math.ceil(filteredSongs.length / itemsPerPage);
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedValue.artist === "" && selectedValue.album === "") {
      setFilterData(false);
    }
    dispatch(songActions.filterSong(selectedValue));
  }, [dispatch, selectedValue, songs]);

  const uniqueAlbum = [...new Set(filteredSongs.map((obj) => obj.album))];
  const uniqueArist = [...new Set(filteredSongs.map((obj) => obj.artist))];

  return (
    <Container1>
      <Header>
        <Text
          textAlign="left"
          fontSize={4}
          paddingLeft={20}
          fontWeight={700}
          color={"#1b2223"}
        >
          SONG APP
        </Text>
        {!props.ishide && (
          <AddButton onClick={props.formShowHandler}>
            Add Song new song
          </AddButton>
        )}
      </Header>

      <SongsListContainer>
        <Text
          textAlign="left      
      "
          fontSize={3}
          paddingLeft={30}
          paddingTop={10}
          fontWeight={600}
        >
          All list of Songs
        </Text>

        <FilterWrapper>
          <FilterContiner>
            <Label>Filter by artist</Label>
            <Select
              value={selectedValue.artist}
              onChange={(e) => {
                setSelectedValue({ ...selectedValue, artist: e.target.value });

                setFilterData(true);
              }}
            >
              <Option value="">All artist</Option>
              {uniqueArist.map((option) => (
                <Option key={Math.random().toString()} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FilterContiner>

          <FilterContiner>
            <Label>Filter by album</Label>
            <Select
              value={selectedValue.album}
              onChange={(e) => {
                if (e.target.value === "" && selectedValue.artist === "") {
                  setFilterData(false);
                } else {
                  setFilterData(true);
                }

                setSelectedValue({ ...selectedValue, album: e.target.value });
                console.log(e.target.value);
              }}
            >
              <Option value="">All album</Option>
              {uniqueAlbum.map((option) => (
                <Option key={Math.random().toString()} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </FilterContiner>
        </FilterWrapper>
        <FlexContainer>
          <Table>
            <thead>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>song Title</TableHead>
                <TableHead>Artist</TableHead>
                <TableHead>Gener</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </thead>
            <TBody>
              {paginatedAlbums.map((song, index) => (
                <TableRow key={index}>
                  <TableData>
                    {filteredSongs.findIndex((value) => {
                      return value._id === song._id;
                    }) + 1}
                  </TableData>
                  <TableData>{song.title}</TableData>
                  <TableData>{song.artist}</TableData>
                  <TableData>{song.genre}</TableData>
                  <TableData>{song.album}</TableData>
                  <TableData>
                    <ActionIcon>
                      <Icon
                        onClick={() => {
                          props.formShowHandler();
                          // setIsNewSong(false);
                          props.setSongtobeUpdated(song);
                        }}
                      >
                        edit
                      </Icon>
                    </ActionIcon>
                  </TableData>
                  <TableData>
                    <ActionIcon>
                      <Icon
                        variant="outline"
                        onClick={() => {
                          if (confirm("are sure you want to delete")) {
                            dispatch(
                              songActions.startDeleteSong({ _id: song._id })
                            );
                          }
                        }}
                      >
                        delete
                      </Icon>
                    </ActionIcon>
                  </TableData>
                </TableRow>
              ))}
            </TBody>
          </Table>
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
              <Label>{itemsPerPage} per Page</Label>
              <Select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(e.target.value);
                }}
              >
                <Option value="10">10</Option>
                <Option value="20">20</Option>
                <Option value="30">30</Option>
                <Option value="40">40</Option>
                <Option value="50">50</Option>
              </Select>
            </FilterContiner>
          </Flex>
        </FlexContainer>
      </SongsListContainer>
    </Container1>
  );
};

export default SongList;
