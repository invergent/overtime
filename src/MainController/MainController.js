import features from '../application/features';

const {
  signin, updateBranch, addOrChangeSupervisor, PasswordReset
} = features;

class MainController {
  static async signin(req, res, models) {
    const [statusCode, message, data] = await signin(req.body, models);
    if (statusCode !== 200) {
      return res.status(statusCode).json({ message });
    }
    res.cookie('token', data.hashedToken,
      { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(statusCode).json({ message, data });
  }

  static async updateBranch(req, res, models) {
    const [statusCode, message] = await updateBranch(req, models);
    return res.status(statusCode).json({ message });
  }

  static async addOrChangeSupervisor(req, res, models) {
    const [statusCode, message] = await addOrChangeSupervisor(req, models);
    return res.status(statusCode).json({ message });
  }

  static async forgotPassword(req, res, models, client) {
    const [statusCode, message] = await PasswordReset.forgotPassword(req, models, client);
    return res.status(statusCode).json({ message });
  }

  static async confirmPasswordResetRequest(req, res) {
    const [statusCode, message, hashedToken] = await PasswordReset.confirmPasswordResetRequest(req);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ message });
    }

    res.cookie('token', hashedToken, { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(statusCode).json({ message });
  }

  static async resetPassword(req, res, models) {
    const [statusCode, message] = await PasswordReset.resetPassword(req, models);
    return res.status(statusCode).json({ message });
  }
}

export default MainController;
