import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import firebase from "firebase/app";
import 'firebase/auth';
import "firebase/firestore";

// Custom Reducers
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//configurar firestore
const firebaseConfig = {
	apiKey: "AIzaSyAwdDlPq-L_kqLrK0pXICKxjijsrw8EJ1c",
	authDomain: "bibliostore-831aa.firebaseapp.com",
	databaseURL: "https://bibliostore-831aa.firebaseio.com",
	projectId: "bibliostore-831aa",
	storageBucket: "bibliostore-831aa.appspot.com",
	messagingSenderId: "927341671663",
	appId: "1:927341671663:web:1298d3de4e90682d53171a",
	measurementId: "G-7HSMSNZP6N"
};

//inicializar firebase
firebase.initializeApp(firebaseConfig);

//configuracion de react-redux
const rrfConfig = {
	userProfile: "users",
	useFirestoreForProfile: true
};

// crear el anhancer con compose de redux y firestore
const createStoreWithFirebase = compose(
	reactReduxFirebase(firebase, rrfConfig),
	reduxFirestore(firebase)
)(createStore);

// reducers
const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	usuario: buscarUsuarioReducer
});

// state inicial
const initialState = {};

// crear el store
const store = createStoreWithFirebase(
	rootReducer,
	initialState,
	compose(
		reactReduxFirebase(firebase),
		window.__REDUX_DEVTOOLS_EXTENSION__ &&
			window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
