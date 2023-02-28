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
import { getDownloadURL, ref } from "firebase/storage";

const writeUserTask = async (
  jobName,
  place,
  address,
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

  const userLocation = new GeoPoint(
    place.geometry.coordinates[1],
    place.geometry.coordinates[0]
  );

  const taskRef = await addDoc(collection(db, "tasks"), {
    userId: auth.currentUser.uid,
    completedById: "",
    jobName: jobName,
    date: date.getTime(),
    time: time.getTime(),
    payment: parseInt(payment),
    description: description,
    address: address,
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
    console.log("tutto ok!");
  } else {
    return;
  }

  const userRef = collection(db, "tasks");
  const center = { latitude: latitude, longitude: longitude };

  const minSquare = getBoundsOfDistance(center, radius * 1000)[0];
  const maxSquare = getBoundsOfDistance(center, radius * 1000)[1];

  const minGeopoint = new GeoPoint(minSquare.latitude, minSquare.longitude);
  const maxGeopoint = new GeoPoint(maxSquare.latitude, maxSquare.longitude);

  const querySnapshot = await getDocs(
    query(
      userRef,
      where("location", ">", minGeopoint),
      where("location", "<", maxGeopoint)
    )
  );

  const tasks = [];

  const promises = [];

  querySnapshot.forEach((document) => {
    const task = document.data();
    if (task.userId != auth.currentUser.uid) {
      const docRef = doc(db, `users/${task.userId}/taskLIst/${document.id}`);
      const promise = getDoc(docRef).then((docSnap) => {
        if (docSnap.exists() && docSnap.data().accepted === false) {
          tasks.push({
            id: document.id,
            completedById: task.completedById,
            date: new Date(task.date),
            description: task.description,
            jobName: task.jobName,
            address: task.address,
            location: task.location,
            payment: task.payment,
            time: new Date(task.time),
            userId: task.userId,
          });
        }
      });
      promises.push(promise);
    }
  });

  await Promise.all(promises);

  return tasks;
};

const getUserAvatar = async (uid) => {
  return getDownloadURL(ref(storage, "user.png")).then((url) => {
    return url;
  });
};

const acceptTask = async (taskId, userId) => {
  await setDoc(
    doc(db, `users/${auth.currentUser.uid}/acceptedTasks/${taskId}`),
    {
      time: new Date(),
    }
  );

  await updateDoc(doc(db, `users/${userId}/taskLIst/${taskId}`), {
    accepted: true,
  });

  return true;
};

const getUserData = async (uid) => {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } 

  console.log("No such document!");
  return null;
}

module.exports.queryNearTasks = queryNearTasks;
module.exports.writeUserTask = writeUserTask;
module.exports.getUserAvatar = getUserAvatar;
module.exports.acceptTask = acceptTask;
module.exports.getUserData = getUserData;
