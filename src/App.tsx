import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Flex, Text } from "rebass";
import "./App.css";
import { songActions } from "./store";
import styled from "@emotion/styled";
import SongList from "./components/SongList";
import { songType } from "./types/Song.type";
import ModalForm from "./UI/ModalForm";
import AlbumStatistics from "./components/AlbumStatistics";
import Song_and_album_of_Artist from "./components/Song_and_Album_of_Artist";
import SongInGenre from "./components/SongInGenre";
import Total_song_artist_album_genre from "./components/Total_song_artist_album_genre";
const Container = styled.div`
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);
  margin: 20px;
`;
const StatisticsColumnContainer = styled(Flex)`
  flex-wrap: wrap;
  margin-top: 20px;
  width: 100%;

  justify-content: center;

  & > div {
    flex-basis: calc(50% - 16px); /* Adjust margin as needed */
    margin: 8px;
  }

  @media (max-width: 700px) {
    & > div {
      flex-basis: 90%;
    }
  }
`;
const ShadowBox = styled.div`
  padding: 15px 3px;
  margin: 10px;
  border-radius: 11px;
  background: white;
  border-radius: 10px;
  /* Box Shadow */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;
const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNewSong, setIsNewSong] = useState(true);
  const [updateSongData, setUpdatesongData] = useState<songType | null>();

  useEffect(() => {
    dispatch(songActions.fetchStart());
    dispatch(songActions.fetchSongStatisticsStart());
  }, [dispatch]);
  const hideshowForm = (value: boolean) => {
    setModalOpen(value);
  };
  const formShowHandler = () => {
    setIsNewSong(true);
    if (isModalOpen) {
      setModalOpen(false);
    } else {
      setModalOpen(true);
    }
  };
  const setSongtobeUpdated = (value: songType) => {
    setIsNewSong(false);
    setUpdatesongData(value);
  };

  return (
    <>
      {isModalOpen && (
        <ModalForm
          type={isNewSong ? "save" : "update"}
          songData={isNewSong ? null : updateSongData}
          isOpen={isModalOpen}
          showFormHanlder={hideshowForm}
        />
      )}

      <Container>
        {/* <Navbar /> */}
        <SongList
          setSongtobeUpdated={setSongtobeUpdated}
          ishide={isModalOpen}
          formShowHandler={formShowHandler}
        />
      </Container>

      <Container>
        <Text
          textAlign="left      
      "
          fontSize={3}
          paddingLeft={30}
          paddingTop={20}
          fontWeight={600}
        >
          All Statistics of Songs
        </Text>
        <StatisticsColumnContainer>
          <ShadowBox>
            <AlbumStatistics />
          </ShadowBox>

          <ShadowBox>
            <Song_and_album_of_Artist />
          </ShadowBox>
        </StatisticsColumnContainer>
        <StatisticsColumnContainer>
          <Box>
            <ShadowBox>
              <SongInGenre />
            </ShadowBox>
          </Box>
          <Box>
            <ShadowBox>
              <Total_song_artist_album_genre />
            </ShadowBox>
          </Box>
        </StatisticsColumnContainer>
      </Container>
    </>
  );
};

export default App;
