import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";
import CreateUserValidator from "App/Validators/CreateUserValidator";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const usuarios = await Usuario.all();

    return usuarios;
  }

  public async store({ request, response }: HttpContextContract) {
    const { nome, cpf, password } = request.body();

    try {
      await request.validate(CreateUserValidator);

      const usuario = await Usuario.create({
        nome,
        cpf,
        password,
      });

      return usuario;
    } catch (error) {
      return response.badRequest(error.messages);
    }
  }

  public async show({ params }: HttpContextContract) {
    const { id } = params;

    const usuario = await Usuario.findOrFail(id);

    return usuario;
  }

  public async update({ request, params }: HttpContextContract) {
    const { id } = params;
    const usuario = await Usuario.findOrFail(id);

    const data = request.only(["nome", "cpf"]);

    await usuario.merge(data).save();

    return usuario;
  }

  public async destroy({ params }: HttpContextContract) {
    const { id } = params;
    const usuario = await Usuario.findOrFail(id);

    await usuario.delete();
  }

  public async login({ auth, request }: HttpContextContract) {
    const cpf = request.input("cpf");
    const password = request.input("password");

    const token = await auth.use("api").attempt(cpf, password);

    return token;
  }
}
