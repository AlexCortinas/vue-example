import HTTP from "@/common/http";

const resource = "posts";

// función para hacer las llamadas lentas a propósito
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  async getAll() {
    await sleep(1000);
    const response = await HTTP.get(resource);
    return response.data;
  },

  async get(id) {
    await sleep(1000);
    return (await HTTP.get(`${resource}/${id}`)).data;
  },

  async save(post) {
    await sleep(1000);
    if (post.id) {
      return (await HTTP.put(`${resource}/${post.id}`, post)).data;
    } else {
      return (await HTTP.post(`${resource}`, post)).data;
    }
  },

  async delete(id) {
    await sleep(1000);
    return await HTTP.delete(`${resource}/${id}`);
  }
};
