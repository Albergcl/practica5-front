import { Handlers , FreshContext, PageProps} from "$fresh/server.ts";
import { addContact } from "../utils/function.ts";
import { Contact } from "../utils/types.ts";


export const handler:Handlers = {
    POST: async (req: Request , ctx: FreshContext ) => {
        const form = await req.formData();

        // Al obtener los datos del formulario, es posible que devuelva undefined, por eso utilizo el operador ??, para que en ese caso devuelva una cadena vacía.
        const name = form.get("name")?.toString() ?? "";
        const email = form.get("email")?.toString() ?? "";
        const phone = form.get("phone")?.toString() ?? "";

        if(!name && !email && !phone ){
             return ctx.render();       
         }
        
        await addContact(name, email, phone);
            // Redirigir al index si se ha creado el contacto correctamente
            return Response.redirect(new URL("/", req.url));
    },
}


export default function Home (props: PageProps<Contact>) {
    const {name , email , phone} = props.data || {};
     return (
        <div>
            <form method="POST" class = "formulario"> 
            <div class = "campo">
                <input type = "text" name = "name" placeholder="Nombre" value = {name} required ></input>
            </div>
            <div class = "campo">
                <input type = "text" name = "email" placeholder="Email" value = {email} required ></input>
            </div>
            <div class = "campo">
                <input type="text" name="phone" placeholder="Teléfono" value ={phone} required />
            </div>
            <button type = "submit" class = 'boton'> Enviar </button>
            </form>
        </div>
     )
}