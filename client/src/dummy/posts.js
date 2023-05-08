
function generateRandomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

async function generateRandomWord(count=1) {
    console.log("generating random word")
    try {
        let data = await fetch(`https://random-word-api.herokuapp.com/word?number=${count}`);
        let json = await data.json();
        // console.log(json);
        return json;
    } catch (err) {
        console.error(err);
        return 'dummy';
    }
}

async function generateRandomString() {
    try {
        console.log("generating random string")
        let data = await fetch('http://loremricksum.com/api/');
        let json = await data.json();
        return json.data[0];
    } catch (err) {
        console.error(err);
        return 'dummy dimmy dammy dum';
    }
}



async function generateRandomImage(min,max) {
    console.log("generating random image")
    try {
        let url = `https://picsum.photos/${generateRandomNumber(min,max)}/${generateRandomNumber(min,max)}`
        return url;
    } catch (err) {
        console.error(err);
        return 'https://picsum.photos/500/1000';
    }
}

async function generateRandomPost() {
    console.log("generating random post")
    let post = {
        _id: generateRandomNumber(1, 1000000) + '',
        username: await generateRandomWord(),
        title: await generateRandomWord(),
        body: await generateRandomString(),
        image: await generateRandomImage(500, 1000),
        likes: [await generateRandomWord()],
        dislikes: [await generateRandomWord()],
        comments: [{
            _id: generateRandomNumber(1, 1000000) + '',
            username: await generateRandomWord(),
            body: await generateRandomString(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        }],
        createdAt: Date.now(),
        updatedAt: Date.now()
    };

    return post;
}


async function generateRandomPosts() {
    const posts = [];

    for (let i = 0; i < 3; i++) {
        posts.push(await generateRandomPost());
    }

    return posts;

}


export  { generateRandomPosts };




