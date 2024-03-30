export default class ViewsController {
  login(req, res) {
    res.render("login");
  }

  register(req, res) {
    res.render("register");
  }

  profile(req, res) {
    const user = req.session.user;
    if (user) {
      const { first_name } = user;
      console.log("First Name:", first_name);
      res.render("profile", { user, first_name });
    } else {
      res.redirect("views/errorLogin");
    }
  }

  errorRegister(req, res) {
    res.render("errorRegister");
  }

  errorLogin(req, res) {
    res.render("errorLogin");
  }
}
