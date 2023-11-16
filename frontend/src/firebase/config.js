// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyDVW_97ILECWbJgr90HXJlyRWqPD3zBwSQ",
  authDomain: "recircular-5f0e1.firebaseapp.com",
  projectId: "recircular-5f0e1",
  storageBucket: "recircular-5f0e1.appspot.com",
  messagingSenderId: "539131547622",
  appId: "1:539131547622:web:356691d3c2d59ff5c39027"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export function uploadFile(file) {
    const nuevoUUID = uuidv4();
    const storageRef = ref(storage, nuevoUUID)

    uploadBytes(storageRef, file).then((snapshot) => {
      console.log(snapshot)
    });

    return nuevoUUID
}

export async function getFile(name){
    try {
      const downloadURL = await getDownloadURL(ref(storage, name));

      const imgElement = document.createElement('img');
      imgElement.src = downloadURL;

      return imgElement;
    } catch (error) {
        console.error('Error al obtener la imagen:', error);
        throw error;
    }
}