import { auth, db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  GeoPoint,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { getBoundsOfDistance } from "geolib";
import { getBlob, getDownloadURL, ref } from "firebase/storage";

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

  const userLocation = new GeoPoint(place.geometry.coordinates[1], place.geometry.coordinates[0]);

  const taskRef = await addDoc(collection(db, 'tasks'), {
    userId: auth.currentUser.uid,
    completedById: "",
    jobName: jobName,
    date: date.getTime(),
    time: time.getTime(),
    payment: parseInt(payment),
    description: description,
    location: userLocation,
  });

  await setDoc(doc(db, `users/${auth.currentUser.uid}/taskLIst`, taskRef.id), {
    accepted: false,
    completed: false,
  });

  return true;
};

const queryNearTasks = async (latitude, longitude, radius) => {
  if (!isNaN(latitude) && !isNaN(longitude)) {
    console.log('tutto ok!');
  } else {
    return;
  }

  const userRef = collection(db, 'tasks');
  const center = {latitude: latitude, longitude: longitude};

  const minSquare = getBoundsOfDistance(center, (radius * 1000))[0];
  const maxSquare = getBoundsOfDistance(center, (radius * 1000))[1];

  const minGeopoint = new GeoPoint(minSquare.latitude, minSquare.longitude);
  const maxGeopoint = new GeoPoint(maxSquare.latitude, maxSquare.longitude);

  const querySnapshot = await getDocs(query(userRef, 
    where('location', '>', minGeopoint),
    where('location', '<', maxGeopoint)
  ));

  const tasks = [];

  querySnapshot.forEach((doc) => {
    const task = doc.data();
    if (task.userId != auth.currentUser.uid) {
      tasks.push({
        id: doc.id,
        completedById: task.completedById,
        date: new Date(task.date),
        description: task.description,
        jobName: task.jobName,
        location: task.location,
        payment: task.payment,
        time: new Date(task.time),
        userId: task.userId
      });
    }
  });

  console.log(tasks);

  return tasks;
};

module.exports.queryNearTasks = queryNearTasks;
module.exports.writeUserTask = writeUserTask;
