import { ReactNode, useState } from 'react';
import { ThemeContext, Theme } from '../context/ThemeContext';
import { changeCssRouteVariables } from '../model/ChangeCssRouteVariables';
import { storage } from '../model/storage';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children, ...props }: Props) => {
  const [theme, setTheme] = useState<Theme>(
    storage.getItem('theme') || Theme.LIGHT,
  );

  changeCssRouteVariables(theme);

  function changeTheme(theme: Theme) {
    storage.setItem('theme', theme);
    setTheme(theme);
    changeCssRouteVariables(theme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
      {...props}
    >
      {children}
    </ThemeContext.Provider>
  );
};
