/* Массив, в котором будем хранить посты.
   При перезагрузке страницы массив будет «пробуждён» из localStorage,
   если он там есть (это упрощённый способ сохранять данные между сессиями). */
let posts = JSON.parse(localStorage.getItem('posts')) || [];

/* Сохраняем массив в localStorage каждый раз, когда он меняется */
function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

/* Добавляем новый пост */
function addPost() {
    const text = document.getElementById('text').value.trim();
    const imageFile = document.getElementById('image').files[0];
    const createdAt = Date.now();

    // Если и текст, и файл пусты – просто выходим
    if (!text && !imageFile) {
        alert('Введите текст или выберите изображение');
        return;
    }

    const post = { text, createdAt };

    // Если выбран файл – читаем его как DataURL (чтобы потом вставить в <img>)
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
            post.image = reader.result;
            posts.unshift(post);
            savePosts();
            render();
        };
        reader.readAsDataURL(imageFile);
    } else {
        posts.unshift(post);
        savePosts();
        render();
    }

    // Очищаем поля ввода
    document.getElementById('text').value = '';
    document.getElementById('image').value = '';
}

/* Рендерим только те посты, которые моложе 24 ч */
function render() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const now = Date.now();
    const validPosts = posts.filter(p => now - p.createdAt < 24 * 60 * 60 * 1000);

    validPosts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'post';

        // Текст (если есть)
        const textHTML = p.text ? `<div>${p.text}</div>` : '';

        // Картинка (если есть)
        const imgHTML = p.image ? `<img src="${p.image}" alt="post image">` : '';

        // Осталось времени до «истечения» (чтобы показать таймер)
        const msLeft = 24 * 60 * 60 * 1000 - (now - p.createdAt);
        const hoursLeft = Math.ceil(msLeft / (60 * 60 * 1000));

        div.innerHTML = `
            ${textHTML}
            ${imgHTML}
            <div class="time">⏳ ${hoursLeft}h left</div>
        `;
        feed.appendChild(div);
    });
}

/* Авто‑обновление ленты каждые 60 секунд */
setInterval(render, 60_000);

/* При загрузке страницы сразу рендерим те посты, которые уже есть */
render();
