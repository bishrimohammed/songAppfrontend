import { call, put, takeLatest } from "redux-saga/effects";
import { songActions } from "../store/index";
function* fetchSongStatisticsSaga() {
  try {
    const res = yield call(() =>
      fetch("http://localhost:3001/song/statistics")
    );
    const data = yield res.json();

    yield put(songActions.setSongStatistics(data));
    yield console.log("stata fired");
  } catch (error) {
    console.log(error);
  }
}
export function* StatisticsSaga() {
  yield takeLatest("songs/fetchSongStatisticsStart", fetchSongStatisticsSaga);
}
