"use client";

import styles from "./page.module.css";

export default function Page(): JSX.Element {
  async function getPosts(): Promise<void>{
    console.log(process.env.BASE_URL)
    const val = await fetch(`/api/get-recent-posts`, {
      method: "POST",
      body: JSON.stringify({product:1}),
    });
    console.log(val);
  }
  const handleClick = ():void => {
    void getPosts();
  };
  return (
    <main className={styles.main}>
      <button onClick={handleClick} type="button" >Click me</button>
    </main>
  );
}
