import { ofetch } from "ofetch";
const baseUrl = "http://localhost:9003/api/messages";

const getAll = async () => {
  try {
    const response = await ofetch(`${baseUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

const create = async (formData) => {
  try {
    const response = await ofetch(`${baseUrl}`, {
      method: "POST",
      body: formData,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};

export default { getAll, create };
