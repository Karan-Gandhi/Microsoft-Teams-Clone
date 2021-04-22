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
    return firebase.auth().currentUser != null;
};

const loginWithEmailAndPassword = (email, password, errorCallback, sucessCallback) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(sucessCallback).catch(errorCallback);
};

const createUserWithEmailAndPassword = (email, password, errorCallback, sucessCallback) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(sucessCallback).catch(errorCallback);
};
