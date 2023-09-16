import { call, put, takeLatest } from "redux-saga/effects";
import { songActions } from "../store/index";
function* fetchSongStatisticsSaga() {
  try {
    const res: unknown = yield call(() =>
      fetch("https://songappapi.onrender.com/song/statistics")
    );
    const data = yield res.json();
    yield put(songActions.setSongStatistics(data));
  } catch (error) {
    console.log(error);
  }
}
export function* StatisticsSaga() {
  yield takeLatest("songs/fetchSongStatisticsStart", fetchSongStatisticsSaga);
}
