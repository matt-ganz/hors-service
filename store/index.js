export const actions = {
    async getPosts() {
        console.log('IN STORE -- getPosts()');
        let res = await this.$axios.get('/posts');
        return res;
    }
}