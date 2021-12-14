import Gun from "gun";
import SEA from "gun/sea";
import iris from "iris-lib";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const GunContext = createContext(null);

export const GunProvider = ({ children }) => {
  const [gun, setGun] = useState(null);

  useEffect(() => {
    const g = Gun(["https://gun-hackathon-test.herokuapp.com/gun"]);
    console.log("GUN IS FUCKING READY", g);
    setGun(g);

    // @ts-expect-error
    g.on("auth", (...args) => console.log("on auth", ...args));

    return () => g.off();
  }, []);

  return <GunContext.Provider value={gun}>{children}</GunContext.Provider>;
};

const useGun = () => {
  const gun = useContext(GunContext);

  const login = useCallback(
    (login, password) => {
      if (!gun) return;
      const user = gun.user();
      user.auth(login, password);
    },
    [gun]
  );

  const createUser = useCallback(
    (login, alias, password) => {
      console.log("create user", gun);
      if (!gun) return;
      console.log(gun);
      const user = gun.user();
      user
        .create(login, password)
        .on((ack) => console.log("created user", { login, alias, ack }));
      const infos = { alias, createdAt: Date.now() };
      user.get("profile").set(infos);
      console.log("user", user);
      const pair = SEA.pair((keys) => console.log("SEA keys", keys));
    },
    [gun]
  );

  return {
    createUser,
    login,
    gun,
  };
};

export default useGun;
