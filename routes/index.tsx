import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getContacts } from "../utils/function.ts";
import { Contact } from "../utils/types.ts";

export const handler: Handlers<Contact[]> = {
  GET: async (_req, ctx: FreshContext) => {
    const contacts = await getContacts();
    return ctx.render(contacts);
  },
};

export default function Home({ data }: PageProps<Contact[]>) {
  return (
    <div class="layout">
      <div class="contact-list">
        <div className="main">
          <h2>Contactos</h2>
          <a href="/contactonuevo" class="btn">Añadir Contacto</a>
        </div>

        <ul>
          {data.map((contact) => (
            <div key={contact._id} class="contact-item">
              <p><strong>Nombre:</strong> {contact.name}</p>
              <p><strong>Telefono:</strong> {contact.phone}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <a href={`/chat/${contact.chatId}`} class="btn">Mensajes enviados</a>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
