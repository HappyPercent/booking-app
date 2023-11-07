import {
  AppBar,
  Button,
  Container,
  MenuItem,
  Select,
  Toolbar,
} from "@mui/material";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {LOCAL_STORAGE_USER_CREDENTIALS_LABEL} from "./core/constants/localStorage";
import {useEffect, useState} from "react";
import {useCoreStore} from "./core/store";
import {LANGUAGES} from "./core/constants/languages";

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userExists, setUserExists] = useState<boolean>(false);
  const userLang = useCoreStore((state) => state.userSettings.lang);
  console.log("userSettings: ", userLang);
  const setLanguage = useCoreStore((state) => state.setLanguage);
  useEffect(() => {
    setUserExists(() => {
      const credentials = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL) || "{}"
      );
      return !!credentials.username && !!credentials.password;
    });
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_USER_CREDENTIALS_LABEL);
    navigate("/");
  };

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        paddingTop: 8,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
        pb: 4,
      }}
    >
      <AppBar position="fixed" color="transparent" sx={{boxShadow: "none"}}>
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            gap: 4,
          }}
        >
          <Select
            value={LANGUAGES.find((l) => l.name === userLang)?.name}
            onChange={(e) => setLanguage(e.target.value as string)}
          >
            {LANGUAGES.map((language) => (
              <MenuItem value={language.name}>{language.label}</MenuItem>
            ))}
          </Select>
          {userExists && (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Outlet />
    </Container>
  );
};
