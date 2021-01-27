import { openDB } from 'idb';

// openDB jika tidak ada akan create sesuai nama 'bola-net'
const dbPromise = openDB('bola-net', 1, {
    upgrade(db, oldVersion) {
        switch (oldVersion) {
            case 0:
                console.log('IDB: creating object Store');
                const store = db.createObjectStore('team', { keyPath: 'id', autoIncrement: true });
                console.log('IDB: creating name index');
                store.createIndex('name', 'name', { unique: true });
        }
    }
})
// function for save to object store
const saveToDB = item => {
    dbPromise
        .then(db => {
            const tx = db.transaction('team', 'readwrite');
            const store = tx.objectStore('team');
            return store.put(item);
        })
        .then((response) => {
            console.log(`Berhasil menambahkan team: "${item.name}" dengan idKey: "${response}"`)
            document.getElementById('save-button').classList.add('saved');
        })
        .catch(err => console.log(err));
}
// function for delete item from objectStore
const deleteFromDB = key => {
    return dbPromise
        .then(db => {
            const tx = db.transaction('team', 'readwrite');
            const store = tx.objectStore('team');
            return store.delete(key);
        }).then(item => {
            console.log('Berhasil menghapus')
            document.getElementById('save-button').classList.remove('saved');
        }).catch(err => console.log(err));
}
// function to get item by ID in objectStore
const getById = key => {
    return dbPromise
        .then(db => {
            const tx = db.transaction('team', 'readonly');
            const store = tx.objectStore('team');

            return store.get(key);
        })
}
// function to get all data from objectStore
const getFromDB = () => {
    return dbPromise
        .then(db => {
            const tx = db.transaction('team', 'readonly');
            const store = tx.objectStore('team');
            const index = store.index('name')

            return index.getAll();
        })
}

export { saveToDB, getById, getFromDB, deleteFromDB };