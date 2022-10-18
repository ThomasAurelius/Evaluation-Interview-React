import { Provider } from "react-redux";
import { setupRedux } from "src/redux";
import { useAppHook } from "./app.hook";
import { AppProps } from "./app.props";
import style from "./app.module.scss";
import { Main } from "src/layout";

const store = setupRedux();

const App: React.FC<AppProps> = () => {
  useAppHook();

  return (
    <Provider store={store}>
      <div className={style.app}>
        <Main />
      </div>
    </Provider>
  );
};

export { App };
