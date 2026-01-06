// Ambil username dari localStorage
const user = localStorage.getItem("user");

if (!user) {
  alert("Silakan login dulu!");
  window.location.href = "index.html";
}

// Ganti dengan konfigurasi firebase kamu sendiri
var firebaseConfig = {
  apiKey: "AIzaSyD8eF6fZh18Mi17iJBuhxtUlEBS4nj8CcE",
  authDomain: "acamind-209aa.firebaseapp.com",
  databaseURL: "https://acamind-209aa-default-rtdb.firebaseio.com",
  projectId: "acamind-209aa",
  storageBucket: "acamind-209aa.firebasestorage.app",
  messagingSenderId: "720167965322",
  appId: "1:720167965322:web:db1c97efae8d9080ee5373"
};

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

const chatBox = document.getElementById("chatBox");

// Fungsi kirim pesan
function sendMessage() {
  const msgInput = document.getElementById("message");
  const msg = msgInput.value.trim();
  if (!msg) return;

  db.ref("chat").push({
    user: user,
    text: msg
  });

  msgInput.value = "";
}

// Mendengarkan pesan baru secara realtime
db.ref("chat").on("child_added", function(snapshot) {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<b>${data.user}:</b> ${data.text}`;
  chatBox.appendChild(div);

  // Auto scroll ke bawah
  chatBox.scrollTop = chatBox.scrollHeight;
});
