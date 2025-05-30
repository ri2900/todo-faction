import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDd2R8FefFOqSe2muB6Zk1jzZ_QhUzNKI",
  authDomain: "todo-faction.firebaseapp.com",
  projectId: "todo-faction",
  storageBucket: "todo-faction.firebasestorage.app",
  messagingSenderId: "342141679101",
  appId: "1:342141679101:web:8f5197955351aa68939594"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Frontend logic
document.addEventListener("DOMContentLoaded", async () => {
  const pwField = document.getElementById("admin-password");
  const panel = document.getElementById("admin-panel");
  if (pwField) {
    pwField.addEventListener("input", () => {
      if (pwField.value === "8011") {
        panel.style.display = "block";
      }
    });

    document.getElementById("add-product").onclick = async () => {
      const title = document.getElementById("title").value;
      const price = document.getElementById("price").value;
      const image = document.getElementById("image").value;
      const sizes = document.getElementById("sizes").value.split(",");
      const description = document.getElementById("description").value;

      await addDoc(collection(db, "products"), {
        title, price, image, sizes, description
      });
      alert("Product added!");
    };

    document.getElementById("update-links").onclick = async () => {
      const whatsapp = document.getElementById("whatsapp").value;
      const telegram = document.getElementById("telegram").value;
      await setDoc(doc(db, "links", "contact"), { whatsapp, telegram });
      alert("Links updated!");
    };
  }

  const productsDiv = document.getElementById("products");
  const orderBox = document.getElementById("order-confirmation");

  if (productsDiv) {
    const querySnapshot = await getDocs(collection(db, "products"));
    const contactSnap = await getDoc(doc(db, "links", "contact"));
    const contactData = contactSnap.exists() ? contactSnap.data() : {};

    querySnapshot.forEach(docSnap => {
      const data = docSnap.data();
      const div = document.createElement("div");
      div.innerHTML = `
        <img src="${data.image}" width="150"><br>
        <b>${data.title}</b><br>
        ৳${data.price}<br>
        Sizes: ${data.sizes.join(", ")}<br>
        <button>Buy Now</button>
      `;
      div.querySelector("button").onclick = async () => {
        const orderId = "T" + Math.floor(1000 + Math.random() * 9000);
        await addDoc(collection(db, "orders"), {
          orderId,
          productId: docSnap.id,
          time: Date.now()
        });
        productsDiv.innerHTML = "";
        orderBox.style.display = "block";
        orderBox.innerHTML = `
          <h2>Order Placed!</h2>
          <p>Your Order ID: <b>${orderId}</b></p>
          <p>Send this code to confirm your order:</p>
          <a href="${contactData.whatsapp || "#"}" target="_blank">WhatsApp</a> |
          <a href="${contactData.telegram || "#"}" target="_blank">Telegram</a>
        `;
      };
      productsDiv.appendChild(div);
    });
  }
});
