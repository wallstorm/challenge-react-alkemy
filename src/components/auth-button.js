import { useHistory } from "react-router-dom";
import { useAuth } from "../use-auth";

export function AuthButton() {
    let history = useHistory();
    let auth = useAuth();
    
    return auth.token ? (
        <>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                    auth.signout(() => history.push("/"));
                }}
            >
                Sign Out
            </button>
        </>
    ) : (
        null
    );
}