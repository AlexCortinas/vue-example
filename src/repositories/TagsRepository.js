import HTTP from "@/common/http";

const resource = "tags";

export default {
  async getAll() {
    const response = await HTTP.get(resource);
    return response.data;
  }
};
