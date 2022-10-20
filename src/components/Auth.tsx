import { Button, Dialog, TextField } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useStoreContextValue } from '../context/store.context';

import styles from './Auth.module.css';

function Auth() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { authStore } = useStoreContextValue();

  const authenticated = authStore.isAuthenticated;

  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await authStore.login(formValues);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {authenticated ? <h2>You are logged in</h2> : null}
      <Dialog open={!authenticated}>
        <form onSubmit={onSubmit} className={styles.container}>
          <h2>Login</h2>
          <TextField
            onChange={handleChange}
            label="email"
            name="email"
            type="email"
          />
          <TextField
            onChange={handleChange}
            label="password"
            name="password"
            type="password"
          />
          <Button type="submit">Login</Button>
        </form>
      </Dialog>
    </>
  );
}

export default observer(Auth);
