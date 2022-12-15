import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Category } from "../../../../types/Category";
import CartWidget from "../../../Cart/CartWidget";
import { useAuthContext } from "../../../../providers/AuthProvider";
import Link from "next/link";

//si uso el modo 2 para Props puedo tipar children en el caso de necesitarlo.
interface Props {
  // children: JSX.Element | JSX.Element[] | string | (name: string) => React.ReactNode
  categories: Category[];
}

//Modo 1
//de estas 2 maneras va a aceptar children, pero si no hay necesidad mejor usar Modo 2.
// const NavigationItems: React.FunctionComponent<Props> = ({ pages }) => {}
//otra forma FC abreviado
// const NavigationItems: React.FC<Props> = ({ pages }) => {}

//Modo 2
//de esta manera no va a aceptar children, salvo que lo tipee en la interfaz declarada arriba de todo.
const NavigationItems = ({ categories }: Props) => {

  const auth = useAuthContext();

  const btnStyle = {
    style: { color: "#000" },
    sx: { my: 2, display: "block", fontSize: 16 },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: 'center' }}>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.description}`}>
            <Button
              {...btnStyle}
            >
              {cat.description}
            </Button>
          </Link>
        ))}
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Button {...btnStyle} onClick={auth.isUserAuthenticated() ? auth.logout : auth.openAuthModal}>
          {auth.isUserAuthenticated() ? 'Salir' : 'Ingresar'}
        </Button>

        {auth.isUserAuthenticated() && <CartWidget />}
      </Box>
    </>
  );
};

export default NavigationItems;
