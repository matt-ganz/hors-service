export const actions = {
    async getPosts() {
         let res = await this.$axios.get(`/posts`);
        return res;
    }
}