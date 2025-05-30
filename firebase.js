const db = firebase.firestore();
const storage = firebase.storage();

function uploadImageAndAddProduct() {
  const file = document.getElementById("imageUpload").files[0];
  if (!file) return alert("Select an image first.");

  const ref = storage.ref("products/" + Date.now() + "_" + file.name);
  ref.put(file).then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const price = document.getElementById("price").value;
      const sizes = document.getElementById("sizes").value.split(",");

      return db.collection("tshirts").add({
        title,
        description,
        price,
        sizes,
        image: url
      });
    })
    .then(() => alert("Product added successfully!"))
    .catch(error => {
      console.error(error);
      alert("Failed to add product.");
    });
}

function updateContacts() {
  const telegram = document.getElementById("telegram").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const messenger = document.getElementById("messenger").value;

  db.collection("settings").doc("contacts").set({
    telegram,
    whatsapp,
    messenger
  }).then(() => alert("Contacts updated!"))
    .catch(console.error);
}
