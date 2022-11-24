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
  const linkStyle = (isActive: boolean) => {
    return isActive
      ? { color: "#fff", textDecoration: "underline" }
      : { color: "#000" };
  };

  const auth = useAuthContext();

  const btnStyle = {
    style: { color: "#000" },
    sx: { ml: 3, my: 2, display: "block", fontSize: 16 },
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/category/${cat.description}`}>
            <Button
              // style={({ isActive }) => linkStyle(isActive)}
              style={{ color: "#000" }}
              sx={{ my: 2, display: "block", fontSize: 16 }}
            >
              {cat.description}
            </Button>
          </Link>
        ))}
      </Box>

      {auth.isUserAuthenticated() ? (
        <>
          <CartWidget />
          <Button {...btnStyle} onClick={auth.logout}>
            Salir
          </Button>
        </>
      ) : (
        <Button {...btnStyle} onClick={auth.openAuthModal}>
          Ingresar
        </Button>
      )}
    </>
  );
};

//este modo sirve para mostrar cómo tipar lo que devuelve una función render
// const NavigationItems = ({ pages }: Props) => {
//   const renderList = (): JSX.Element[] => {
//     return pages.map((page, index) => (
//       <Button key={index} sx={{ my: 2, color: "#000000", display: "block" }}>
//         {page}
//       </Button>
//     ));
//   };

//   return (
//     <>
//       <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//         {renderList()}
//       </Box>

//       <CartWidget />
//     </>
//   );
// };

export default NavigationItems;
