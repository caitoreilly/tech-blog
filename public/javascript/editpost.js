// create 2 functions - one to update and one to delete linked to buttons created in onepost-dash.handlebars

// const deleteButton = document.querySelector("#delete");
// console.log(deleteButton);

async function editFormHandler(event) {
  event.preventDefault();

  console.log(this);
    const postId = document.querySelector('input[name="post-id"]').value;
    console.log(postId);

  const title = document.querySelector("#post-title").value.trim();
  const body = document.querySelector("#post-body").value.trim();

  if (title && body) {
    const response = await fetch("/api/posts/" + postId, {
      method: "PUT",
      body: JSON.stringify({
        title,
        body,
      }),
      headers: { "Content-Type": "application/json" },
    });

    // check the response status
    if (response.ok) {
      console.log("success");
      window.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#edit-post")
  .addEventListener("submit", editFormHandler);

// const updateButton = document.querySelector(".updateButton");

// const updatePost = async (event) => {
//   const updateTitle = document.querySelector("#updateTitle").value;
//   const updateBody = document.querySelector("#updateBody").value;

//   const id = event.target.getAttribute("data-id");
//   const response = await fetch(`/api/post/${id}`, {
//     method: "PUT",
//     body: JSON.stringify({
//       title: updateTitle,
//       body: updateBody,
//     }),
//     headers: { "Content-Type": "application/json" },
//   });
//   if (response.ok) {
//     document.location.replace("/dashboard");
//     alert("Your post has been updated!");
//   } else {
//     alert("You must log in to edit your posts.");
//   }
// };
