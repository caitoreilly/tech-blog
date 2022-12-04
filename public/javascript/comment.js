async function commentFormHandler(event) {
  event.preventDefault();

  const body = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (body) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        body,
        post_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    document.location.reload();
  }
}

document
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
