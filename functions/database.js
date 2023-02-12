import { auth, db, geocollection } from "../firebase";
import {
  doc,
  GeoPoint,
  getDoc,
  updateDoc,
} from "firebase/firestore";

const writeUserTask = async (
  jobName,
  place,
  date,
  time,
  payment,
  description
) => {
  const docRef = doc(db, "users", auth.currentUser.uid);
  const docSnap = await getDoc(docRef);
  let data = undefined;

  if (docSnap.exists()) {
    data = docSnap.data().balance;
    if (data < payment) return false;
    await updateDoc(docRef, {
      balance: data - payment,
    });
  } else {
    return false;
  }

  geocollection.add({
    userId: auth.currentUser.uid,
    completedById: "",
    jobName: jobName,
    date: date.getTime(),
    time: time.getTime(),
    payment: parseInt(payment),
    description: description,
    coordinates: new GeoPoint(
      place.geometry.coordinates[0],
      place.geometry.coordinates[1]
    ),
  });

  return true;
};

const queryNearTasks = async (latitude, longitude, radius) => {
  let coordinates = [];

  if (!isNaN(latitude) && !isNaN(longitude)) {
    coordinates = [latitude, longitude];
  } else {
    return;
  }

  const query = geocollection.near({
    center: new GeoPoint(coordinates[0], coordinates[1]),
    radius: radius,
  });

  // Get query (as Promise)
  query.get().then((value) => {
    // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    console.log(value.docs);
  });
};

module.exports.queryNearTasks = queryNearTasks;
module.exports.writeUserTask = writeUserTask;
