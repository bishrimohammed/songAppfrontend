import { call, put, takeEvery } from "redux-saga/effects";
import { songActions } from "../store/index";
import { songType } from "../types/Song.type";
import { PayloadAction } from "@reduxjs/toolkit";
function* fetchSongSaga() {
  try {
    const res = yield call(() => fetch("http://localhost:3001/song"));
    const data = yield res.json();
    // console.log(data);
    yield put(songActions.addSongs(data));
    yield console.log("song saga fired");
  } catch (error) {
    console.log(error);
  }
}
function* storeNewSongSaga(action: PayloadAction<songType>) {
  try {
    const res = yield call(() =>
      fetch("http://localhost:3001/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data = yield res.json();
      //console.log(data);

      yield put(songActions.addNewSong(data));
    } else {
      throw new Error("Failed to add todo");
    }

    console.log(action.payload);
    yield console.log("add new songsong saga fired");
  } catch (error) {
    console.log(error);
  }
}
function* updateSong(action: PayloadAction<songType>) {
  try {
    const res = yield call(() =>
      fetch("http://localhost:3001/song", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data = yield res.json();
      yield console.log(data.result);
      yield console.log("update songsong saga fired");
      yield put(songActions.updateSong(data.result));
    } else {
      throw new Error("Failed to add todo");
    }

    //console.log(action.payload);
  } catch (error) {
    console.log(error);
  }
}
function* DeleteSong(action: PayloadAction<{ _id: string }>) {
  try {
    const res = yield call(() =>
      fetch("http://localhost:3001/song", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data = yield res.json();
      yield console.log(data.result);
      yield console.log("delete songsong saga fired");
      yield console.log(action.payload);
      yield put(songActions.deleteSong(data.result));
    } else {
      throw new Error("Failed to add todo");
    }
  } catch (error) {
    console.log(error);
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export function* songSaga() {
  yield takeEvery("songs/fetchStart", fetchSongSaga);
}

export function* NewsongSaga() {
  yield takeEvery("songs/addNewStart", storeNewSongSaga);
}

export function* UPdatesongSaga() {
  yield takeEvery("songs/updateStartStart", updateSong);
}
export function* DeletesongSaga() {
  yield takeEvery("songs/startDeleteSong", DeleteSong);
}
