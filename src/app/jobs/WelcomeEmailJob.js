import Mail from "../../lib/Mail";

class WelcomeEmailJob {
  get key() {
    return "WelcomeEmail";
  }

  async handle({ data }) {
    const { email, name } = data;

    Mail.send({
      to: email,
      subject: "Welcome!",
      text: `Hi ${name}, welcome to our system.`,
    });
  }
}

export default new WelcomeEmailJob();
