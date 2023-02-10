import { rtdb, auth, db } from "../firebase";
import { push, ref, set, update } from "firebase/database";
import { GeoFire } from "geofire";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

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
  const taskRef = ref(rtdb, "tasks");
  const newTaskRef = push(taskRef);
  const newTaskId = newTaskRef.key;
  const taskCoordinatesRef = ref(rtdb, `tasks/${newTaskId}`);
  const geofire = new GeoFire(taskRef);
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

  await geofire
    .set(newTaskId, [
      place.geometry.coordinates[0],
      place.geometry.coordinates[1],
    ])
    .then(
      () => {
        console.log("Provided keys have been added to GeoFire");
      },
      (error) => {
        console.log("Error: " + error);
      }
    );

  await update(taskCoordinatesRef, {
    userId: auth.currentUser.uid,
    completedById: "",
    jobName: jobName,
    date: date.getTime(),
    time: time.getTime(),
    payment: parseInt(payment),
    description: description,
  })
    .then(() => {
      console.log("Provided keys have been added to GeoFire");
    })
    .catch((error) => {
      console.log(error);
      return false;
    });

  const userRef = doc(
    db,
    "users",
    `${auth.currentUser.uid}/tasksList/${newTaskId}`
  );

  await setDoc(userRef, {
    accepted: false,
    completed: false,
  });

  return true;
};

const queryNearTasks = async (latitude, longitude, radius) => {
  const firebaseRef = ref(rtdb, "tasks");
  const geoFire = new GeoFire(firebaseRef);
  let coordinates = [];

  if (!isNaN(latitude) && !isNaN(longitude)) {
    coordinates = [latitude, longitude];
  } else {
    return;
  }

  const query = geoFire.query({
    center: coordinates,
    radius: radius,
  });

  var onKeyEnteredRegistration = await query.on(
    "key_entered",
    await function (key, location, distance) {
      console.log(
        key +
          " entered query at " +
          location +
          " (" +
          distance +
          " km from center)"
      );
    }
  );

  return () => {
    query.cancel();
    onKeyEnteredRegistration.cancel();
  };
};

module.exports.queryNearTasks = queryNearTasks;
module.exports.writeUserTask = writeUserTask;
