import { async } from "@firebase/util";
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         sendEmailVerification, 
         signInWithPopup,
         sendPasswordResetEmail  } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, provider } from "../firebase";
import { validateEmail, validatePassword } from "./validation";

const handleSignUp = (auth, email, password, name) => {
  if (name === '') return;
  if (!validateEmail(email) || !validatePassword(password)) return;

  createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredentials) => {
      const user = userCredentials.user;
      console.log(user);
      await setDoc(doc(db, 'users', auth.currentUser.uid), {
        name: name,
      });
      sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Email verification sent, verify your account.');
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
};

const handleLogIn = (auth, email, password) => {
  if (!validateEmail(email) || !validatePassword(password)) return;
  
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Logged In with: ", user.email);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

const handleGoogleSignUp = (auth) => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          name: user.displayName,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
}

const handleResetPassword = (auth, email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    alert('Check your inbox to reset you password!');
  })
  .catch((error) => {
    const errorMessage = error.message;
    alert('An error occured: ', errorMessage);
  });
}

module.exports.handleSignUp = handleSignUp;
module.exports.handleLogIn = handleLogIn;
module.exports.handleGoogleSignUp = handleGoogleSignUp;
module.exports.handleResetPassword = handleResetPassword;
