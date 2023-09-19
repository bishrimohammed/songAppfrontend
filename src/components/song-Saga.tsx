import { call, put, takeEvery } from "redux-saga/effects";
import { songActions } from "../store/index";
import { songType } from "../types/Song.type";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { StatisticsSaga } from "./Statistics-Saga";

function* fetchSongSaga() {
  try {
    const res: unknown = yield call(() => fetch("http://localhost:4000/song"));
    const data = yield res.json();
    yield put(songActions.addSongs(data));
  } catch (error) {
    console.log(error);
  }
}
function* storeNewSongSaga(action: PayloadAction<songType>) {
  try {
    const res: unknown = yield call(() =>
      fetch("http://localhost:4000/song", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data = yield res.json();
      yield put(songActions.addNewSong(data));
      toast.success("Song is added successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      throw new Error("Failed to add todo");
    }
  } catch (error) {
    console.log(error);
  }
}
function* updateSong(action: PayloadAction<songType>) {
  try {
    const res: unknown = yield call(() =>
      fetch("http://localhost:4000/song", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data = yield res.json();

      yield put(songActions.updateSong(data.result));
      toast.success("Song is updated successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
    const res: unknown = yield call(() =>
      fetch("http://localhost:4000/song", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      })
    );
    if (res.ok) {
      const data: unknown = yield res.json();
      console.log(data.succes);

      yield put(songActions.deleteSong(data.result));
      //return data.succes;
      toast.error("Song is deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
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
