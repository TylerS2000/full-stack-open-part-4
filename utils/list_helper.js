const dummy = (blogs) => {
    return 1
    }

const totalLikes = (blogs) => {
    let total = 0;
    for (let i = 0; i < blogs.length; i++) {
        const element = blogs[i];
        total+=element.likes;
    }
    return total;
}

const favoriteBlog = (blogs) => {
    let currentFavorite = blogs[0];
    for(let i = 0; i<blogs.length; i++){
        const element = blogs[i];
        if(element.likes > currentFavorite.likes){
            currentFavorite = element;
        }
    }
    return currentFavorite;
}

    const mostBlogs = (blogs) => {
        let map = {};
        let currentMostBlogs = 0;
        let currentAuthor = "";
        for(let i =0; i<blogs.length; i++){
            const element = blogs[i];
            if(map[element.author]){
                map[element.author] += 1;
            }
            else{
            map[element.author] = 1;
            }
        }
            for(const property in map){
                if(map[property] > currentMostBlogs){
                    currentMostBlogs = map[property];
                    currentAuthor = property;
                }

            }  
            return {author: currentAuthor, blogs: currentMostBlogs};
    }

    const mostLikes = (blogs) => {
        let map = {};
        let currentMostLikes = 0;
        let currentAuthor = "";
        for(let i=0;i<blogs.length; i++){
            const element = blogs[i];
            if(map[element.author]){
                map[element.author] += element.likes;
            }
            else{map[element.author] = element.likes;}
        }
        for(const property in map){
            if(map[property]>currentMostLikes){
                currentMostLikes = map[property];
                currentAuthor = property;
            }
        }
        return {author: currentAuthor, likes: currentMostLikes};
    }
    
module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}