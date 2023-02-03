class ErrorSender {
  static errorWithValidation(res, error) {
    if (error.errors) {
      res.status(400).json({ error: error.errors });
    } else {
      res.status(error.status).json({ error: error.message });
    }
  }
}

module.exports = ErrorSender;
