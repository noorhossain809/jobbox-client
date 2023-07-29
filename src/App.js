import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { getUser, setUser, toggleLoading } from "./features/auth/authSlice";
import auth from "./firebase/firebase.config";
import routes from "./routes/routes";

function App() {
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state => state.auth)
  console.log(isLoading);
useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if(user){
      dispatch(getUser(user.email))
    }else {
      dispatch(toggleLoading(isLoading))
    }
  })
}, [])
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
