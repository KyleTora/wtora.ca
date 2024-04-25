import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

export const fetchBlogPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};


export { db };