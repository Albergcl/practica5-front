import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getContact, getMessage, sendMessage } from "../../utils/function.ts";
import { Message } from "../../utils/types.ts";

export const handler: Handlers = {
  GET: async (_req, ctx: FreshContext) => {
    const id = ctx.params.id;
    const contact = await getContact(id);

    if (!contact) {
      return new Response("Contacto no encontrado", { status: 404 });
    }

    const chatId = contact.chatId;
    const mensajes = await getMessage(chatId);

    return ctx.render(mensajes);
  },

  POST: async (req: Request, ctx: FreshContext) => {
    const url = await req.formData();

    // Al obtener los datos, es posible que devuelva undefined, por eso utilizo la ?
    const content = url.get("content")?.toString();
    if (!content) {
      return new Response("No hay contenido para enviar");
    }

    const chatId = ctx.params.id;
    await sendMessage(content, chatId, false);

    // Redirigir al chat después de enviar el mensaje
    return Response.redirect(new URL(`/chat/${chatId}`, req.url));
  },
};

export default function Chat({ data }: PageProps<Message[]>) {
  return (
    <>
      <div class="layout">
        <div class="contact-list">
          <div className="main">
            <h2>Mensajes</h2>
            <a href="/" class="btn">Volver</a>
          </div>
          <ul>
            {data.map((mensaje) => (
              <div key={mensaje._id}>
                <p>Mensajes: {mensaje.content}</p>
              </div>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <form method="POST">
          <input type="text" name="content" placeholder="Mensaje" required />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
}
