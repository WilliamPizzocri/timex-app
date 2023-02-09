import { rtdb, auth, db } from "../firebase";
import { push, ref, set } from "firebase/database";
import { GeoFire } from "geofire";
import { doc, setDoc } from "firebase/firestore";

const writeUserTask = async (jobName, place, date, time, payment, description) => {
  const taskRef = ref(rtdb, "tasks");
  const newTaskRef = push(taskRef);

  await set(newTaskRef, {
    userId: auth.currentUser.uid,
    completedById: '', 
    jobName: jobName,
    date: date,
    time: time,
    payment: parseInt(payment),
    description: description
  }).then(() => {
    console.log("Provided keys have been added to GeoFire");
  }).catch((error) => {
    console.log(error);
    return false;
  });

  const newTaskId = newTaskRef.key;
  const taskCoordinatesRef = ref(rtdb, `tasks/${newTaskId}`);
  const geofire = new GeoFire(taskCoordinatesRef);
  const userRef = doc(db, 'users', `${auth.currentUser.uid}/tasksList/${newTaskId}`);

  await setDoc(userRef, {
    accepted: false,
    completed: false
  });

  await geofire.set(newTaskId, [place.geometry.coordinates[0], place.geometry.coordinates[1]]).then(() => {
    console.log("Provided keys have been added to GeoFire");
    return true;
  }, (error) => {
    console.log("Error: " + error);
  })
};

module.exports.writeUserTask = writeUserTask;
