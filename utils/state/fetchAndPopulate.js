import { getDocs } from 'firebase/firestore';

const fetchAndPopulate = set => {
  return async (dataPropertyName, loadingPropertyName, query) => {
    //1) set loading state
    set(state => {
      state[dataPropertyName] = [];
      state[loadingPropertyName] = true;
    });

    //2) grab the users snapshot
    const documentSnapShot = await getDocs(query);

    let tempDatas = [];

    //3) populate temp users by going through snapshots
    documentSnapShot.forEach(doc => {
      let data = doc.data();
      if (data.createdAt) {
        data = { ...data, createdAt: data.createdAt.toDate() };
      }
      tempDatas.push({ ...data, id: doc.id });
    });

    //4) finally disable the loading and update the fields.
    set(state => {
      state[loadingPropertyName] = false;
      state[dataPropertyName] = tempDatas;
    });
  };
};

export default fetchAndPopulate;
