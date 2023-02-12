import { auth, db, geocollection, geoFire } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  GeoPoint,
  getDoc,
  setDoc,
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

  const taskRef = await addDoc(collection(db, 'tasks'), {
    userId: auth.currentUser.uid,
    completedById: "",
    jobName: jobName,
    date: date.getTime(),
    time: time.getTime(),
    payment: parseInt(payment),
    description: description,
  });

  await setDoc(doc(db, `users/${auth.currentUser.uid}/taskLIst`, taskRef.id), {
    accepted: false,
    completed: false,
  });

  geoFire.set(taskRef.id, [place.geometry.coordinates[0], place.geometry.coordinates[1]]).then(function() {
    console.log("Provided key has been added to GeoFire");
  }, function(error) {
    console.log("Error: " + error);
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

  let geoQuery = geoFire.query({
    center: [-50.83, 100.19],
    radius: 5
  });

  let onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
    console.log(key + " entered query at " + location + " (" + distance + " km from center)");
  });
};

module.exports.queryNearTasks = queryNearTasks;
module.exports.writeUserTask = writeUserTask;
