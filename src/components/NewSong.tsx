/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { songActions } from "../store/index";
const Form = styled.form``;
const FormControl = styled.div`
  width: 100%;
  display: inline-flex;
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
    font-size: 18px;
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
const NewSong = (props) => {
  const dispatch = useDispatch();
  const titlevalue = useRef();
  const nameValue = useRef();
  const albumValue = useRef();
  const GenerValue = useRef();
  useEffect(() => {
    if (props.type === "update") {
      titlevalue.current.value = props.songData.title;
      nameValue.current.value = props.songData.artist;
      albumValue.current.value = props.songData.album;
      GenerValue.current.value = props.songData.genre;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songData.id]);
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      titlevalue.current.value.trim() !== "" &&
      nameValue.current.value.trim() !== "" &&
      albumValue.current.value.trim() !== "" &&
      GenerValue.current.value.trim() !== ""
    ) {
      if (props.type === "save") {
        const newSongData = {
          id: Math.random().toString(),
          title: titlevalue.current.value,
          artist: nameValue.current.value,
          album: albumValue.current.value,

          genre: GenerValue.current.value,
        };

        dispatch(songActions.addSong(newSongData));
        titlevalue.current.value = "";
        nameValue.current.value = "";
        albumValue.current.value = "";
        GenerValue.current.value = "";
      } else {
        const updatedSongData = {
          id: props.songData.id,
          title: titlevalue.current.value,
          artist: nameValue.current.value,
          album: albumValue.current.value,

          genre: GenerValue.current.value,
        };
        dispatch(songActions.updateSong(updatedSongData));
        titlevalue.current.value = "";
        nameValue.current.value = "";
        albumValue.current.value = "";
        GenerValue.current.value = "";

        // eslint-disable-next-line react/prop-types
        props.showFormHanlder(true);
      }
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <FormControl>
        <FormRow>
          <FormColumn>
            <Label htmlFor="SongTitle">song title</Label>
            <InputElement
              ref={titlevalue}
              type="text"
              name="title"
              id="SongTitle"
              placeholder="song title"
            ></InputElement>
          </FormColumn>
          <FormColumn>
            <Label htmlFor="ArtistName">Artist Name</Label>
            <InputElement
              ref={nameValue}
              type="text"
              name="artist"
              id="ArtistName"
              placeholder="Artist Name"
            ></InputElement>
          </FormColumn>
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
              <Option value="hippop">Hip Hop</Option>
              <Option value="rock">Rock</Option>
              <Option value="Reggae">Reggae</Option>
              <Option value="Funk">Funk</Option>
            </Select>
          </FormColumn>
        </FormRow>
      </FormControl>
      <Button type="submit">{props.type} song</Button>
    </Form>
  );
};

export default NewSong;
