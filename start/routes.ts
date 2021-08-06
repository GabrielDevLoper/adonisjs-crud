import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.resource("/usuarios", "UsersController").apiOnly();
}).middleware("auth");

Route.post("/login", "UsersController.login");
