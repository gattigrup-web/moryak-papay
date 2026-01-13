<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Moryak Papay ⚓</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  margin: 0;
    font-family: Arial, sans-serif;
      background: #0b1d2a;
        color: #fff;
        }
        header {
          background: #081620;
            padding: 15px;
              text-align: center;
              }
              header img { height: 50px; }

              .container {
                max-width: 700px;
                  margin: auto;
                    padding: 20px;
                    }

                    .new-post textarea, .new-post input, .new-post button {
                      width: 100%;
                        margin-top: 10px;
                          padding: 12px;
                            border-radius: 8px;
                              border: none;
                              }

                              .new-post button {
                                background: #f4c430;
                                  font-weight: bold;
                                    cursor: pointer;
                                    }

                                    .post {
                                      background: #132f44;
                                        border-radius: 12px;
                                          padding: 15px;
                                            margin-top: 15px;
                                            }
                                            .post img {
                                              width: 100%;
                                                border-radius: 10px;
                                                  margin-top: 10px;
                                                  }

                                                  .time {
                                                    font-size: 12px;
                                                      opacity: 0.7;
                                                      }
                                                      </style>
                                                      </head>

                                                      <body>

                                                      <header>
                                                        <img src="papay.png" alt="Moryak Papay">
                                                        </header>

                                                        <div class="container">

                                                          <div class="new-post">
                                                              <textarea id="text" placeholder="What's new?"></textarea>
                                                                  <input type="file" id="image" accept="image/*">
                                                                      <button onclick="addPost()">Post (24h)</button>
                                                                        </div>

                                                                          <div id="feed"></div>

                                                                          </div>

                                                                          <script>
                                                                          let posts = [];

                                                                          function addPost() {
                                                                            const text = document.getElementById('text').value;
                                                                              const image = document.getElementById('image').files[0];
                                                                                const createdAt = Date.now();

                                                                                  if (!text && !image) return alert("Write text or add photo");

                                                                                    const post = { text, createdAt };

                                                                                      if (image) {
                                                                                          const reader = new FileReader();
                                                                                              reader.onload = () => {
                                                                                                    post.image = reader.result;
                                                                                                          posts.unshift(post);
                                                                                                                render();
                                                                                                                    };
                                                                                                                        reader.readAsDataURL(image);
                                                                                                                          } else {
                                                                                                                              posts.unshift(post);
                                                                                                                                  render();
                                                                                                                                    }

                                                                                                                                      document.getElementById('text').value = '';
                                                                                                                                        document.getElementById('image').value = '';
                                                                                                                                        }

                                                                                                                                        function render() {
                                                                                                                                          const feed = document.getElementById('feed');
                                                                                                                                            feed.innerHTML = '';

                                                                                                                                              const now = Date.now();
                                                                                                                                                posts = posts.filter(p => now - p.createdAt < 24 * 60 * 60 * 1000);

                                                                                                                                                  posts.forEach(p => {
                                                                                                                                                      const hoursLeft = Math.ceil(
                                                                                                                                                            (24 * 60 * 60 * 1000 - (now - p.createdAt)) / (60 * 60 * 1000)
                                                                                                                                                                );

                                                                                                                                                                    const div = document.createElement('div');
                                                                                                                                                                        div.className = 'post';
                                                                                                                                                                            div.innerHTML = `
                                                                                                                                                                                  <div>${p.text || ''}</div>
                                                                                                                                                                                        ${p.image ? `<img src="${p.image}">` : ''}
                                                                                                                                                                                              <div class="time">⏳ ${hoursLeft}h left</div>
                                                                                                                                                                                                  `;
                                                                                                                                                                                                      feed.appendChild(div);
                                                                                                                                                                                                        });
                                                                                                                                                                                                        }

                                                                                                                                                                                                        // автоочистка каждые 60 секунд
                                                                                                                                                                                                        setInterval(render, 60000);
                                                                                                                                                                                                        </script>

                                                                                                                                                                                                        </body>
                                                                                                                                                                                                        </html>
                                                                                                                                                                                                        