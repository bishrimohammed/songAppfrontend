import { all, call } from "redux-saga/effects";
import { StatisticsSaga } from "./Statistics-Saga";
import {
  songSaga,
  NewsongSaga,
  UPdatesongSaga,
  DeletesongSaga,
} from "./song-Saga";
export default function* rootSaga() {
  yield all([
    call(songSaga),
    StatisticsSaga(),
    NewsongSaga(),
    UPdatesongSaga(),
    DeletesongSaga(),
  ]);
}
