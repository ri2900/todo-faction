
const db = firebase.firestore();
const storage = firebase.storage();
const adminPassword = "8011";

function checkPassword() {
  const input = document.getElementById("adminPassword").value;
  if (input === adminPassword) {
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("adminPanel").classList.remove("hidden");
  } else {
    alert("Incorrect password!");
  }
}

function uploadImageAndAddProduct() {
  const file = document.getElementById("imageUpload").files[0];
  if (!file) return alert("Select an image.");

  const ref = storage.ref("products/" + Date.now() + "_" + file.name);
  ref.put(file).then(snapshot => {
    return snapshot.ref.getDownloadURL();
  }).then(url => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    const sizes = document.getElementById("sizes").value.split(",");

    db.collection("products").add({
      title,
      description,
      price,
      sizes,
      image: url
    }).then(() => {
      alert("Product added!");
    }).catch(console.error);
  }).catch(console.error);
}

function updateContacts() {
  const telegram = document.getElementById("telegram").value;
  const whatsapp = document.getElementById("whatsapp").value;
  const messenger = document.getElementById("messenger").value;

  db.collection("settings").doc("contacts").set({
    telegram,
    whatsapp,
    messenger
  }).then(() => {
    alert("Contacts updated!");
  }).catch(console.error);
}
