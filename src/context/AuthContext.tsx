import {
  createContext,
  Dispatch,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CognitoUser } from "@aws-amplify/auth";
import { Hub, Auth } from "aws-amplify";

interface UserContextType {
  cognitoUser: CognitoUser | null;
  setCognitoUser: Dispatch<SetStateAction<CognitoUser>>;
}
const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props {
  children: ReactElement;
}

export default function AuthContext({ children }: Props): ReactElement {
  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(null);

  const contextValue = useMemo(() => ({ cognitoUser, setCognitoUser }), [cognitoUser]);
  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setCognitoUser(amplifyUser);
      }
    } catch (error) {
      setCognitoUser(null);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser();
    });
  }, []);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}

export const useUser = (): UserContextType => useContext(UserContext);
