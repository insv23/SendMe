import { ofetch } from "ofetch";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const getAll = async () => {
  try {
    const response = await ofetch(`${baseUrl}/api/messages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

const create = async (formData) => {
  try {
    const response = await ofetch(`${baseUrl}/api/messages`, {
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
