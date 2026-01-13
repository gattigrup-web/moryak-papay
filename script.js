let posts = JSON.parse(localStorage.getItem('posts')) || [];

function savePosts() {
    localStorage.setItem('posts', JSON.stringify(posts));
}

function addPost() {
    const text = document.getElementById('text').value.trim();
    const imageFile = document.getElementById('image').files[0];
    const createdAt = Date.now();

    // Проверяем наличие текста или файла
    if (!text && !imageFile) {
        alert('Введите текст или выберите изображение');
        return;
    }

    const post = { text, createdAt };

    // Читаем изображение, если выбрано
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = () => {
            post.image = reader.result;
            posts.unshift(post);
            savePosts();
            render();
        };
        reader.onerror = () => {
            alert('Ошибка при загрузке изображения');
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

function render() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const now = Date.now();
    const validPosts = posts.filter(p => now - p.createdAt < 24 * 60 * 60 * 1000);

    validPosts.forEach(p => {
        const div = document.createElement('div');
        div.className = 'post';

        const textHTML = p.text ? `<div>${p.text}</div>` : '';
        const imgHTML = p.image ? `<img src="${p.image}" alt="post image">` : '';
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

setInterval(render, 60_000);
render();
