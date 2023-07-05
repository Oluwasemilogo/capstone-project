import React, { useState, useEffect } from "react";
import ShorteningLoading from "../ShorteningLoading/ShorteningLoading";
import ShorteningResult from "../ShorteningResult/ShorteningResult";
import styles from "./Shortnening.module.css";
import axios from "axios";
import classNames from "classnames";

interface Link {
  originalLink: string;
  newLink: string;
  linkId: string;
  shortLink: string;
}

const Shortening: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(
    "Shorten a link here..."
  );
  const [shortLinks, setshortLinks] = useState<Link>();
  const [error, setError] = useState<boolean>(false);

  const getData = async (originalLink: string) => {
    const token = localStorage.getItem("token");
    console.log(token);

    setLoading(true);

    axios
      .post(
        `https://linkr-mvp2.onrender.com/create`,
        {
          originalLink: originalLink,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => {
        setLoading(false);

        let shortLink: string = resp.data.link.shortLink;
        console.log(shortLink);
        setshortLinks(
          // ...shortLink,
          {
            shortLink,
            originalLink: inputValue,
            newLink: shortLink,
            linkId: resp.data.link._id,
          },
        );
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setError(false); // Reset error state when the input changes
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\\/]))?/;

    if (!inputValue || !regex.test(inputValue)) {
      setError(true);
      setInputPlaceholder("Please enter a valid link...");
      setInputValue("");
      return;
    }

    setError(false);
    getData(inputValue);
    setInputValue("");
    setInputPlaceholder("Shorten a link here...");
  };

  const inputClasses = classNames(styles.input, error && styles.error);

  return (
    <>
      <div className={styles.outerInput}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            aria-required={true}
            aria-label="url"
            name="url"
            placeholder={inputPlaceholder}
            className={inputClasses}
            value={inputValue}
            onChange={handleChange}
          />
          <button className={styles.submitBtn} disabled={loading}>
            Shorten It
          </button>
        </form>
      </div>
      <div className={styles.resultsWrapper}>
        {loading ? <ShorteningLoading /> : shortLinks?.shortLink  && <ShorteningResult links={shortLinks} />}
      </div>
    </>
  );
};

export default Shortening;
