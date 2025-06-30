// Importa las funciones que necesitas de los SDK que necesitas
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Agregar SDK para los productos de Firebase que desea utilizar
// https://firebase.google.com/docs/web/setup#available-libraries

// La configuración de Firebase de su aplicación web
// Para Firebase JS SDK v7.20.0 y posteriores, MeasurementId es opcional
const firebaseConfig = {
  apiKey: "AIzaSyA3RNB2-eg4MBaD9nHWCtRTmzNcqVefzmw",
  authDomain: "habitwise-66566.firebaseapp.com",
  projectId: "habitwise-66566",
  storageBucket: "habitwise-66566.firebasestorage.app",
  messagingSenderId: "954488943672",
  appId: "1:954488943672:web:c26f50735ff0a25d6322cd",
  measurementId: "G-M61JP4LCDT"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);