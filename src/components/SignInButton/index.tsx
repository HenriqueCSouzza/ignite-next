import React, { ReactElement } from "react";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { signIn, signOut, useSession } from "next-auth/client";

import styles from "./styles.module.scss";
interface Props {}

export default function SignInButton({}: Props): ReactElement {
  const [session] = useSession();

  return session ? (
    <button className={styles.signInButton} onClick={() => signOut()}>
      <FaGithub color="#04d361" />
      {session.user.name}
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.signInButton} onClick={() => signIn("google")}>
      <FaGithub color="#eba417" />
      SignIn with Github
    </button>
  );
}
