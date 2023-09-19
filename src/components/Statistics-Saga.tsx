import { call, put, takeEvery } from "redux-saga/effects";
import { songActions } from "../store/index";
function* fetchSongStatisticsSaga() {
  try {
    const res: unknown = yield call(() =>
      fetch("http://localhost:4000/song/statistics")
    );
    const data = yield res.json();
    yield put(songActions.setSongStatistics(data));
    console.log("yes");
  } catch (error) {
    console.log(error);
  }
}
export function* StatisticsSaga() {
  yield takeEvery("songs/fetchSongStatisticsStart", fetchSongStatisticsSaga);
}
