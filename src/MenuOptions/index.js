const prompt = require("prompts");
const { getUserInfo, getAnswer, sendAnswer } = require("../Services");
const {
  writeData,
  readAnswerFile,
  encrypyToSha1,
  decryptCesar,
} = require("../Helpers");

module.exports = {
  async option1() {
    const { email } = await prompt({
      type: "text",
      name: "email",
      message: "Type your email: ",
    });

    const { password } = await prompt({
      type: "password",
      name: "password",
      message: "Type your password: ",
    });

    try {
      const { challenge_submission_hash } = await getUserInfo(email, password);

      console.log("token: " + challenge_submission_hash);
    } catch (error) {
      console.log("Attempt to get user info failed");
    }
  },

  async option2() {
    const { token } = await prompt({
      type: "text",
      name: "token",
      message: "Type here your codenation token: ",
    });

    console.log("waiting answer..");
    try {
      const answer = await getAnswer(token);
      const decrypted = await decryptCesar(answer.cifrado, answer.numero_casas);
      const decryptedSha1 = encrypyToSha1(decrypted);
      answer.decifrado = decrypted;
      answer.resumo_criptografico = decryptedSha1;
      await writeData(answer);
      console.log("The answer has been written");
    } catch (error) {
      console.log("somthing went wrong");
    }
  },

  async option3() {
    const answer = await readAnswerFile();
    await sendAnswer(answer);
  },
};
