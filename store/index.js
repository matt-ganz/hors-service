export const actions = {
    async getPosts() {
         let res = await this.$axios.get(`/posts`);
        return res;
    }
}

export const mutations = {
    async savePost(state, data) {
        let res = await this.$axios.post('/posts', {post: data});
        return res;
    }
}