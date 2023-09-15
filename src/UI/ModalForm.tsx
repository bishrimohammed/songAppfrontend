import React, { useEffect, useRef } from "react";
import { Box, Text } from "rebass";
import styled from "@emotion/styled";
import { songActions } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { SongsState, songType } from "../types/Song.type";

const ModalBackdrop = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9997;
`;
const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  z-index: 9998;
`;

const ModalContent = styled(Box)`
  position: relative;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 20px;
  width: 400px;
  max-width: 100%;
  z-index: 9999;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;
const Form = styled.form``;
const FormControl = styled.div`
  width: 100%;

  gap: 10px;
`;
const FormRow = styled.div`
  width: 100%;
`;
const FormColumn = styled.div`
  margin-bottom: 10px;
`;
const Label = styled.label`
  color: #3a3a3a;
  margin-bottom: 30px;
  padding: 50px 0;
`;
const InputElement = styled.input`
  width: 100%;
  padding: 15px 20px;
  margin-top: 10px;
  background-color: aliceblue;
  border: none;
  ::placeholder {
    font-size: 13px;
  }
  :focus {
    border: none;
  }
`;

const Select = styled.select`
  padding: 15px 20px;
  margin-top: 10px;
  background-color: aliceblue;
  font-size: 1rem;
  color: #3a3a3a;
  width: 100%;
  border: none;
`;
const Option = styled.option`
  padding: 7px;
  font-size: 1rem;
`;
const Button = styled.button`
  padding: 15px;
  width: 100%;
  text-align: center;
  margin-top: 15px;
  background-color: black;
  color: white;
  font-size: 1rem;
  border: none;
  cursor: pointer;
`;
interface propsType {
  type: string;
  songData: null | songType;
  isOpen: boolean;
  showFormHanlder: (value: boolean) => void;
}
function ModalForm(props: propsType) {
  const dispatch = useDispatch();

  const songs: songType[] = useSelector((state: SongsState) => state.songs);
  const titlevalue = useRef<HTMLInputElement>(null);
  const nameValue = useRef<HTMLInputElement>(null);
  const albumValue = useRef<HTMLInputElement>(null);
  const GenerValue = useRef<HTMLSelectElement>(null);
  const uniqueGenre = [...new Set(songs.map((obj) => obj.genre))];
  useEffect(() => {
    if (props.type === "update") {
      titlevalue.current!.value = props.songData.title;
      nameValue.current!.value = props.songData.artist;
      albumValue.current!.value = props.songData.album;
      GenerValue.current!.value = props.songData.genre;
    }
  }, [props.type]);

  const submitHandler = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      titlevalue.current?.value.trim() !== "" &&
      nameValue.current?.value.trim() !== "" &&
      albumValue.current?.value.trim() !== "" &&
      GenerValue.current?.value.trim() !== ""
    ) {
      if (props.type === "save") {
        const newSongData = {
          _id: "",
          title: titlevalue.current.value,
          artist: nameValue.current.value,
          album: albumValue.current.value,
          genre: GenerValue.current.value,
        };
        //console.log(newSongData);
        dispatch(songActions.addNewStart(newSongData));
        titlevalue.current.value = "";
        nameValue.current.value = "";
        albumValue.current.value = "";
        GenerValue.current.value = "";
        props.showFormHanlder(false);
      } else {
        const updatedSongData = {
          _id: props.songData._id,
          artist: nameValue.current!.value,
          title: titlevalue.current!.value,
          album: albumValue.current!.value,
          genre: GenerValue.current!.value,
        };
        dispatch(songActions.updateStartStart(updatedSongData));
        titlevalue.current.value = "";
        nameValue.current.value = "";
        albumValue.current.value = "";
        GenerValue.current.value = "";

        props.showFormHanlder(false);
      }
    }
  };
  /*
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submi");
  };*/
  return (
    <ModalBackdrop>
      <Backdrop
        onClick={() => {
          props.showFormHanlder(false);
        }}
      />
      <ModalContent>
        <CloseButton
          onClick={() => {
            props.showFormHanlder(false);
          }}
        >
          &times;
        </CloseButton>
        <Text fontSize={24} mb={3}>
          {props.type === "save" ? "Add new song" : "Update song"}
        </Text>
        <Form onSubmit={submitHandler}>
          <FormControl>
            <FormRow>
              <>
                <Label htmlFor="SongTitle">song title</Label>
                <InputElement
                  ref={titlevalue}
                  type="text"
                  name="title"
                  id="SongTitle"
                  placeholder="song title"
                ></InputElement>
              </>
              <>
                <Label htmlFor="ArtistName">Artist Name</Label>
                <InputElement
                  ref={nameValue}
                  type="text"
                  name="artist"
                  id="ArtistName"
                  placeholder="Artist Name"
                ></InputElement>
              </>
            </FormRow>
            <FormRow>
              <FormColumn>
                <Label htmlFor="Album">Album</Label>
                <InputElement
                  ref={albumValue}
                  type="text"
                  name="album"
                  id="Album"
                  placeholder="Album"
                ></InputElement>
              </FormColumn>
              <FormColumn>
                {" "}
                <Label htmlFor="genre">select genre</Label>
                <Select id="genre" ref={GenerValue} name="genre">
                  {uniqueGenre.map((option) => (
                    <Option key={Math.random().toString()} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </FormColumn>
            </FormRow>
          </FormControl>
          <Button type="submit">{props.type} song</Button>
        </Form>
      </ModalContent>
    </ModalBackdrop>
  );
}

export default ModalForm;
