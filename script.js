// ---------- SIGNUP ----------
function signup() {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  if (!nameInput.value || !emailInput.value || !passwordInput.value) {
    alert("All fields are required");
    return;
  }

  const user = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    followers: 0,
    following: false
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Signup successful");
  location.href = "login.html";
}

// ---------- LOGIN ----------
function login() {
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No user found. Please signup first.");
    return;
  }

  if (
    loginEmail.value === user.email &&
    loginPassword.value === user.password
  ) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful");
    location.href = "home.html";
  } else {
    alert("Invalid login");
  }
}

// ---------- HOME ----------
function loadHome() {
  const user = JSON.parse(localStorage.getItem("user"));
  const welcome = document.getElementById("welcome");

  if (!user) return;

  welcome.innerText = "Hello, " + user.name;
  showPosts();
}

// ---------- ADD POST ----------
function addPost() {
  const postText = document.getElementById("postText");
  if (!postText.value) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    text: postText.value,
    likes: 0,
    comments: []
  });

  localStorage.setItem("posts", JSON.stringify(posts));
  postText.value = "";
  showPosts();
}

// ---------- SHOW POSTS ----------
function showPosts() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const postsDiv = document.getElementById("posts");

  postsDiv.innerHTML = "";

  posts.forEach((p, i) => {
    postsDiv.innerHTML += `
      <div class="post">
        <p>${p.text}</p>

        <button onclick="likePost(${i})">
          Like (${p.likes})
        </button><br><br>

        <input id="c${i}" placeholder="Comment">
        <button onclick="addComment(${i})">Add</button>

        <p>${p.comments.join("<br>")}</p>
      </div>
    `;
  });
}

// ---------- LIKE ----------
function likePost(i) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts[i].likes++;
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

// ---------- COMMENT ----------
function addComment(i) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  const commentInput = document.getElementById("c" + i);

  if (!commentInput.value) return;

  posts[i].comments.push(commentInput.value);
  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

// ---------- PROFILE ----------
function loadProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  if (!user) return;

  document.getElementById("pname").innerText =
    "Name: " + user.name;

  document.getElementById("pemail").innerText =
    "Email: " + user.email;

  document.getElementById("pposts").innerText =
    "Posts: " + posts.length;

  document.getElementById("pfollowers").innerText =
    "Followers: " + user.followers;

  const followBtn = document.getElementById("followBtn");
  followBtn.innerText = user.following ? "Unfollow" : "Follow";
}

// ---------- FOLLOW / UNFOLLOW ----------
function toggleFollow() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user.following) {
    user.followers--;
    user.following = false;
  } else {
    user.followers++;
    user.following = true;
  }

  localStorage.setItem("user", JSON.stringify(user));
  loadProfile();
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.removeItem("loggedIn");
  location.href = "login.html";
}
