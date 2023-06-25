import React, { useState } from "react";
import ShorteningLoading from "../ShorteningLoading/ShorteningLoading";
import ShorteningResult from "../ShorteningResult/ShorteningResult";
import styles from "./Shortnening.module.css";
import axios from "axios";
import classNames from "classnames";

interface Link {
  originalLink: string;
  newLink: string;
  linkId: string;
}

const Shortening: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputPlaceholder, setInputPlaceholder] = useState<string>(
    "Shorten a link here..."
  );
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getData = (originalLink: string) => {
    setLoading(true);

    let url = `https://api.shrtco.de/v2/shorten?url=${originalLink}`;

    axios
      .get(url)
      .then((resp) => {
        setLoading(false);

        let shortenLink = resp.data.result.full_short_link;
        setLinks([
          ...links,
          {
            originalLink: inputValue,
            newLink: shortenLink,
            linkId: new Date().getTime().toString(),
          },
        ]);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log(err);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let regex =
      /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;

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
            Shorten It!
          </button>
        </form>
      </div>
      <div className={styles.resultsWrapper}>
        {loading && <ShorteningLoading />}
        {links.length > 0 && <ShorteningResult links={links} />}
      </div>
    </>
  );
};

export default Shortening;
