class Responder {
  static async respond(req, res, method) {
    const [statusCode, message, data] = await method(req);
    const jsonResponse = { message };
    if (data) {
      jsonResponse.data = data;
    }
    return res.status(statusCode).json(jsonResponse);
  }

  static async respondWithCookie(req, res, method) {
    const [statusCode, message, data, tokenType] = await method(req);

    if (statusCode !== 200) {
      return res.status(statusCode).json({ message });
    }

    res.cookie(tokenType, data.hashedToken,
      { expires: new Date(Date.now() + 3600000), httpOnly: true });
    return res.status(statusCode).json({ message, data });
  }

  static async download(req, res, method) {
    const [filePath, fileName] = await method(req);
    return res.download(filePath, fileName);
  }
}

export default Responder;
