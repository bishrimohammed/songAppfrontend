import styled from "@emotion/styled";

import NewSong from "./NewSong";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { songActions } from "../store/index";
const Container1 = styled.div`
  padding: 0 5%;
  max-width: 100%;
  width: 100%;
  overflow-x: hidden;
`;

const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;
const Logo = styled.h2`
  font-size: 1.5rem;
`;
const AddButton = styled.button`
  padding: 15px 20px;
  border: none;
  letter-spacing: 1.4px;
  background-color: ${(props) => props.bgclor};
  color: ${(props) => props.textColor};
  font-weight: 500;

  cursor: pointer;
`;
const SongsListContainer = styled.div`
  width: 100%;
  position: relative;
`;
const Title = styled.h1`
  font-size: 1.6rem;
`;
const FilterWrapper = styled.div`
  padding-top: 1rem;
  display: flex;
  gap: 1rem;
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
`;
const TableRow = styled.tr`
  :nth-child(even) {
    background-color: #dddddd;
  }
`;
const TableHead = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
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
  padding: 0 10px;
`;
const Icon = styled.span`
  font-size: 1.3rem;
  padding: 3px;
  color: red;
  cursor: pointer;
`;
const Navbar = () => {
  const [showForm, setShowform] = useState(false);
  const [isNewSong, setIsNewSong] = useState(true);
  const [updateSongData, setUpdatesongData] = useState({});

  const [isfilterApplyrd, setFilterData] = useState(false);
  const [selectedValue, setSelectedValue] = useState({
    artist: "",
    album: "",
    genre: "",
  });
  const songs = useSelector((state) => state.songs);
  const filteredSongs = useSelector((state) => state.filtedSongs);

  const dispatch = useDispatch();
  useEffect(() => {
    if (selectedValue.artist === "" && selectedValue.album === "") {
      setFilterData(false);
    }
    dispatch(songActions.filterSong(selectedValue));
  }, [dispatch, selectedValue, songs]);

  const uniqueAlbum = [...new Set(filteredSongs.map((obj) => obj.album))];
  const uniqueArist = [...new Set(filteredSongs.map((obj) => obj.artist))];
  const uniqueGenre = [...new Set(filteredSongs.map((obj) => obj.genre))];
  const formShowHandler = () => {
    setIsNewSong(true);
    if (showForm) {
      setShowform(false);
    } else {
      setShowform(true);
    }
  };

  const hideshowForm = (value) => {
    setIsNewSong(value);
  };

  return (
    <Container1>
      <Header>
        <Logo> Songs</Logo>
        <AddButton
          onClick={formShowHandler}
          bgclor={showForm ? "#000" : "#f0f8ff"}
          textColor={showForm ? "#fff" : ""}
        >
          {!showForm && `Add Song`} {showForm && `Close`}
        </AddButton>
      </Header>
      {showForm && (
        <NewSong
          type={isNewSong ? "save" : "update"}
          songData={isNewSong ? "" : updateSongData}
          showFormHanlder={hideshowForm}
        />
      )}

      <SongsListContainer>
        <Title>Song lists</Title>
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
            <Label>Filter by genre</Label>
            <Select
              value={selectedValue.genre}
              onChange={(e) => {
                setSelectedValue((sv) => {
                  return { ...sv, genre: e.target.value };
                });
              }}
            >
              <Option value="">All genre</Option>
              {uniqueGenre.map((option) => (
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
          <tbody>
            {filteredSongs.map((song, index) => (
              <TableRow key={song._id}>
                <TableData>{++index}</TableData>
                <TableData>{song.title}</TableData>
                <TableData>{song.artist}</TableData>
                <TableData>{song.genre}</TableData>
                <TableData>{song.album}</TableData>
                <TableData>
                  <ActionIcon>
                    <Icon
                      onClick={() => {
                        setShowform(true);
                        setIsNewSong(false);
                        setUpdatesongData(song);
                      }}
                    >
                      E
                    </Icon>
                    <Icon
                      onClick={() => {
                        alert("are sure you want to delete");
                        dispatch(songActions.deleteSong(song.id));
                      }}
                    >
                      D
                    </Icon>
                    <Icon>R</Icon>
                  </ActionIcon>
                </TableData>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </SongsListContainer>
    </Container1>
  );
};

export default Navbar;
