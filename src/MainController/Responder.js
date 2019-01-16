class Responder {
  static async respond(req, res, models, method, client) {
    const [statusCode, message] = await method(req, models, client);
    return res.status(statusCode).json({ message });
  }

  static async respondWithCookie(req, res, models, method) {
    const [statusCode, message, data] = await method(req, models);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ message });
    }

    res.cookie('token', data.hashedToken,
      { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(statusCode).json({ message, data });
  }
}

export default Responder;
