import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";

const handler: Handlers = {
  POST: async (req, ctx: FreshContext) => {
    const url = await req.formData();

    // Al obtener los datos, es posible que devuelva undefined, por eso utilizo el operador ??, para que en ese caso devuelva una cadena vacía.
    const content = url.get("content")?.toString() ?? "";

    return ctx.render(content);
  },
};

function Send(props: PageProps) {
  return (
    <form>
      <input type="text" name="content" placeholder="Mensaje"></input>
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Send;
