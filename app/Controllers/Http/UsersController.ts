import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Usuario from "App/Models/Usuario";

export default class UsersController {
  public async index({}: HttpContextContract) {
    const usuarios = await Usuario.all();

    return usuarios;
  }

  public async store({ request }: HttpContextContract) {
    const data = request.only(["nome", "cpf"]);

    const usuario = await Usuario.create(data);

    return usuario;
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
}
