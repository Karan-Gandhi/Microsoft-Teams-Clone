const initializeFirebaseApp = () => {
    const firebaseConfig = {
        apiKey: "AIzaSyDdfvd0KTHPPlxwvymWVnpxZAXn96CLxQI",
        authDomain: "teams-clone-dece6.firebaseapp.com",
        projectId: "teams-clone-dece6",
        storageBucket: "teams-clone-dece6.appspot.com",
        messagingSenderId: "517447513100",
        appId: "1:517447513100:web:cb18832c7a0cd4eb156a29",
    };

    firebase.initializeApp(firebaseConfig);
};

const userLoggedIn = () => {
    return new Promise(resolve =>
        firebase.auth().onAuthStateChanged(user => {
            if (user) resolve(true);
            else resolve(false);
        })
    );
};

const getUserUID = () => new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user.uid)));

const getCurrentUser = async () => await getUserData(await getUserUID());

const loginWithEmailAndPassword = (email, password, errorCallback, successCallback) => firebase.auth().signInWithEmailAndPassword(email, password).then(successCallback).catch(errorCallback);

const loginWithGoogle = (errorCallback, successCallback) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ login_hint: "user@example.com" });
    firebase.auth().signInWithPopup(provider).then(successCallback).catch(errorCallback);
};

const createUserWithEmailAndPassword = (name, email, password, errorCallback, sucessCallback) => {
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async userCredentials => {
            console.log(userCredentials);
            await createUser(email, password, name, userCredentials.user.uid);
            sucessCallback(userCredentials);
        })
        .catch(errorCallback);
};

const signOutUser = (errorCallback, successCallback) => {
    firebase.auth().signOut().then(successCallback).catch(errorCallback);
};
