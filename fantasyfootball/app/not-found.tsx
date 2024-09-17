"use client";
import { NextPage } from "next";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const Custom404: NextPage = () => {
	const router = useRouter();
	const [counter, setCounter] = useState(5);
  
	useEffect(() => {
	  const countdown = setInterval(() => {
		setCounter((prev) => prev - 1);
	  }, 1000);
  
	  if (counter === 0) {
		router.push("/"); // Redirect to home page after 5 seconds
	  }
  
	  return () => clearInterval(countdown);
	}, [counter, router]);

    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    );
  };
  
  export default Custom404;
  