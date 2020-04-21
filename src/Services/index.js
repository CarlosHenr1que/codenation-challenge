const api = require("./api");
const FormData = require("form-data");
const path = require("path");
const jsonFile = path.resolve(__dirname, "..", "..", "answer.json");
const fs = require("fs");

module.exports = {
  async getUserInfo(email, password) {
    const { data } = await api.post("https://api.codenation.dev/v1/user/auth", {
      email,
      password,
    });
    return data;
  },

  async getAnswer(token) {
    const { data } = await api.get(
      `/challenge/dev-ps/generate-data?token=${token}`
    );
    return data;
  },

  async sendAnswer(answer) {
    try {
      const formData = new FormData();
      formData.append("answer", fs.createReadStream(jsonFile));
      const headers = formData.getHeaders();
      const {
        data,
      } = await api.post(
        `/challenge/dev-ps/submit-solution?token=${answer.token}`,
        formData,
        { headers }
      );
      console.log("SCORE: " + data.score);
    } catch (error) {
      console.log("Attempt to send answer file failed");
    }
  },
};
