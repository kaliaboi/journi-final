import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "../components/ui/input";
import axios from "axios";

export const PasswordContext = createContext(null);

export function PasswordProvider({ children }) {
  const [passwordNeeded, setPasswordNeeded] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const supabase = useSupabaseClient();

  const checkIfPasswordNeeded = async () => {
    const { data } = await supabase
      .from("setups")
      .select("setup_completed, last_secured")
      .eq("user_id", session.user?.id);

    if (data) {
      if (data.length > 0) {
        if (data[0].setup_completed) {
          const lastSecured = data[0].last_secured;
          if (Date.now() - lastSecured > 1800000) {
            console.log(Date.now() - lastSecured);
            setPasswordNeeded(true);
          }
        }
      }
    }
  };

  useEffect(() => {
    console.log(session);
    if (session) {
      checkIfPasswordNeeded();
    }
  }, [session]);

  const handleSubmit = async (pass) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("setups")
      .select("password_hash")
      .eq("user_id", session?.user.id);

    if (data) {
      const hash = data[0].password_hash;
      axios
        .post("/api/checkPassword", { password: pass, hash })
        .then(async (res) => {
          if (res.data.result === true) {
            const response = await supabase
              .from("setups")
              .update({
                last_secured: Date.now(),
              })
              .eq("user_id", session?.user.id)
              .then(() => {
                setError("");
                setPasswordNeeded(false);
                setLoading(false);
              });
          } else {
            setError("Password Incorrect!");
            setLoading(false);
          }
        });
    }
  };

  return (
    <PasswordContext.Provider value={{ passwordNeeded, setPasswordNeeded }}>
      {children}
      <AlertDialog open={passwordNeeded}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-full flex justify-center sm:justify-start">
              <div className="w-36">
                <img src="/tea.svg" alt="" />
              </div>
            </div>

            <AlertDialogTitle>Enter your password</AlertDialogTitle>
            <AlertDialogDescription>
              It's been more 30 minutes since you last entered your Journal
              password, so we locked it for security reasons
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="my-8 flex flex-col gap-2">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
            />
            {error.length > 0 && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => handleSubmit(password)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("enter pressed");
                  handleSubmit(password);
                }
              }}
              disabled={loading}
            >
              {loading ? "Loading..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </PasswordContext.Provider>
  );
}
